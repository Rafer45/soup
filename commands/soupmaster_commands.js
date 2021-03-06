
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
            writeConfig(
                message,
                config,
                `Prefix successfully set to '${newPrefix}'.`,
            );
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

    setpasses: (message, config, _, n) => {
        n = Number(n);
        n = Number.isInteger(n) ? n : 1;
        config.music.passes = n;
        writeConfig(
            message,
            config,
            `Passes successfully set to '${n}'.`,
        );
    },

    setdefaultvolume: (message, config, _, n) => {
        n = Number(n);
        n = !isNaN(n) ? n : 0.16;
        config.music.volume = Math.max(0, Math.min(2, n));
        writeConfig(
            message,
            config,
            `Default volume successfully set to '${config.music.volume}'.`,
        );
    },

    prune: (message, config, _, n) => {
        n = Number(n);
        if (!Number.isInteger(n)) return message.channel.send('Invalid prune amount');

        return message.channel.fetchMessages({ limit: 99 })
            .then((messages) => {
                messages.array()
                    .filter(m => m.author.id === config.ids.soup)
                    .slice(0, n)
                    .forEach(m => m.delete());
            });
    },

    // TODO: Add addStaticCommand command here
};

function writeConfig(message, config, str) {
    fs.writeFile(
        './config.json',
        JSON.stringify(config, null, 4),
        (err) => {
            if (err) throw err;
            message.channel
                .send(str);
        },
    );
}
