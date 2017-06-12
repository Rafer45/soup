
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

const token = fs.readFileSync('./data/api_key.txt', 'utf8');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', (message) => {
  let prefix = 's.';

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  let msg = message.content.slice(prefix.length);

  if (msg.startsWith('ping')) {
    message.reply('pong');
  }

  if (msg.startsWith('die')) {
    client.destroy((err) => {
      console.log(err);
    });
  }

  if (msg.startsWith('echo')) {
    message.channel.send(message.content);
  }
});

client.on("disconnected", () => {
  console.log("Disconnected!");
  process.exit(0);
});

client.login(token);