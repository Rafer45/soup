
const Discord = require('discord.js');
const config = require('./config.json');
const commands = require('./commands.js');

const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
    client.owner = client.users.get(config.ids.soupmaster);
    client.owner.createDM()
        .then((c) => {
            c.send('soup is ready!')
        })
        .catch(console.error);
});

client.on('message', (message) => {
  // Ignore bot messages or messages not starting with prefix
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const contents = message.content.slice(config.prefix.length);
    const [command, ...params] = contents.split(/ +/);
    const msg = contents.trim().slice(command.length + 1);

    if (commands[command] !== undefined) {
        commands[command](message, config, msg, ...params);
    } else {
        message.reply('that\'s not a valid command.');
    }
});

client.on('disconnected', () => {
    console.log('Disconnected!');
    process.exit(0);
});

client.login(config.token);
