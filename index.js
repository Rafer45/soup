
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

String.prototype.isCommand = function(commandString) {
  let str = this.valueOf();
  return str === commandString ||
         str.startsWith(commandString + ' ');
};


client.on('ready', () => {
  console.log("I am ready!");
  client.owner = client.users.get(config.ids.soupmaster);
  
  let main   = client.guilds.get(config.ids.main_guild),
      spam   = main.channels.get(config.ids.spam_channel);

  spam.send(`${client.owner}, soup is ready!`);
});

client.on('message', (message) => {
  // Ignore bot messages or messages not starting with prefix
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let msg = message.content.slice(config.prefix.length);

  if (msg.isCommand('ping')) {
    message.reply('pong');
  }

  if (msg.isCommand('echo')) {
    // If msg is starts with 'echo '
    if (msg.length > 5) {
      message.channel.send(msg.slice(5));
    } else {
      message.channel.send("Please provide valid text to echo.");
    }
  }

  if (msg.isCommand('prefix')) {
    // If msg is starts with 'prefix '
    if (msg.length > 7) {
      let newPrefix = msg.split(' ')[1];
      config.prefix = newPrefix;
      fs.writeFile("./config.json", JSON.stringify(config, null, 4), err => console.error);
      message.channel.send(`Prefix successfully set to '${newPrefix}'`)
    } else {
      message.channel.send("Please provide a valid prefix.");
    }
  }

  if (msg.isCommand('die')) {
    message.channel.send("Emptying can...");
    client.destroy((err) => {
      console.log(err);
    });
  }

});

client.on('disconnected', () => {
  console.log("Disconnected!");
  process.exit(0);
});

client.login(config.token);