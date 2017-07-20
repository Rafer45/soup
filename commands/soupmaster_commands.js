
const fs = require('fs');

module.exports = {
    fn: command => (
        (message, config, ...other) => {
            if (message.author.id === config.ids.soupmaster) {
                command(message, config, ...other);
            }
        }
    ),

    prefix: (message, config, _, newPrefix) => {
        if (newPrefix) {
            config.prefix = newPrefix;
            fs.writeFile(
                './config.json',
                JSON.stringify(config, null, 4),
                console.error,
            );
            message.channel.send(`Prefix successfully set to '${newPrefix}'`);
        } else {
            message.channel.send('Please provide a prefix.');
        }
    },

    die: (message) => {
        message.channel.send('Emptying can...')
            .then(() => {
                console.log('Forced to disconnect.');
                process.exit(0);
            });
    },
};
