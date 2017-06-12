
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
  console.log("I am ready!");
  // client.channels.get('spam').send("Soup is ready!")
});

client.on('message', (message) => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  let msg = message.content.slice(config.prefix.length);

  if (msg.startsWith('ping')) {
    message.reply('pong');
  }

  if (msg.startsWith('echo')) {
    if (msg.length > 5) {
      message.channel.send(msg.slice(5));
    } else {
      message.channel.send("Please provide valid text to echo!");
    }
  }

  if (msg.startsWith('die')) {
    message.channel.send("Shutting down...");
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