
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const commands = require('./commands.js')

// String.prototype.isCommand = function(commandString) {
//   let str = this.valueOf();
//   return str === commandString ||
//          str.startsWith(commandString + ' ');
// };


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

  let _content = message.content.slice(config.prefix.length),
      params   = _content.split(/ +/),
      command  = params.shift(),
      msg      = _content.slice(command.length + 1);

  if (commands[command] !== undefined) {
    commands[command](message, client.owner, msg, ...params);
  } else {
    message.reply("that's not a valid command.");
  }

  // if (command === 'ping') {
  //   message.reply('pong');
  // }

  // if (command === 'echo') {
  //   // If there are parameters
  //   if (params.length > 0) {
  //     message.channel.send(message.content.slice(command.length + config.prefix.length));
  //   } else {
  //     message.channel.send("Please provide valid text to echo.");
  //   }
  // }

  // if (command === 'prefix') {
  //   // If there are parameters
  //   if (params.length > 0) {
  //     let newPrefix = params[0];
  //     config.prefix = newPrefix;
  //     fs.writeFile("./config.json", JSON.stringify(config, null, 4), err => console.error);
  //     message.channel.send(`Prefix successfully set to '${newPrefix}'`)
  //   } else {
  //     message.channel.send("Please provide a valid prefix.");
  //   }
  // }

  // if (command === 'die' && message.author.id === config.ids.soupmaster) {
  //   message.channel.send("Emptying can...")
  //     .then(() => {
  //       console.log("Forced to disconnect.");
  //       process.exit(0);
  //     });
  // }

});

client.on('disconnected', () => {
  console.log("Disconnected!");
  process.exit(0);
});

client.login(config.token);