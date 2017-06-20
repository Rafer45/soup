
const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');
const commands = require('./commands.js')

client.on('ready', () => {
    console.log("I am ready!");
    client.owner = client.users.get(config.ids.soupmaster);
    
    let spam = client.channels.get(config.ids.spam_channel);

    spam.send(`${client.owner}, soup is ready!`);
});

client.on('message', (message) => {
  // Ignore bot messages or messages not starting with prefix
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    let _content = message.content.slice(config.prefix.length),
        [command, ...params] = _content.split(/ +/),
        msg      = _content.slice(command.length + 1);

    if (commands[command] !== undefined) {
        commands[command](message, config, msg, ...params);
    } else {
        message.reply("that's not a valid command.");
    }
});

client.on('disconnected', () => {
    console.log("Disconnected!");
    process.exit(0);
});

client.login(config.token);