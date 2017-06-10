
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();

const token = fs.readFileSync('./api_key.txt', 'utf8');

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  var msg = message.content.toLowerCase();
  switch(msg) {
    case 'ping':
      message.reply('pong');
      break;
    case 'die':
      client.destroy((err) => {
        console.log(err);
      });
      break;
    default:
      break;
  }
});

bot.on("disconnected", () => {
  console.log("Disconnected!");
  process.exit(0);
});

client.login(token);