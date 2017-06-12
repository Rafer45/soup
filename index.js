

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
});

client.on('message', (message) => {
  // Ignore bot messages or messages not starting with prefix
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let msg = message.content.slice(config.prefix.length);

  if (msg.isCommand('ping')) {
    message.reply('pong');
  }

  if (msg.isCommand('echo')) {
    if (msg.length > 5) { // If msg is starts with 'echo '
      message.channel.send(msg.slice(5));   // Echo the rest of msg.
    } else {
      message.channel.send("Please provide valid text to echo!");
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