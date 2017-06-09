
const fs = require('fs')
const Discord = require('discord.js');
const client = new Discord.Client();

const token = fs.readFileSync('./api_key.txt', 'utf8');
console.log(token)

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => {
  if (message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);