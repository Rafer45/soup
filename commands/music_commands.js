
const ytdl = require('ytdl-core');

let queue = {};

module.exports = {
    fn: command => (
        (message, ...other) => {
            command(message.guild.voiceConnection, message, ...other);
        }
    ),

    violence: (voiceConn, message, config, _, url) => {
        if (voiceConn) {
            return module.exports.pleasestop(voiceConn, message)
                .then(() => {
                    setTimeout(() => {
                        module.exports.violence(voiceConn, message, config, _, url);
                    }, 500);
                });
        }

        const vc = message.member.voiceChannel;
        if (!vc) {
            return message.reply('Join a voice channel before using the command.');
        }
        if (!url) {
            return message.reply('Provide a valid URL.');
        }
        // Adapted from https://github.com/fent/node-ytdl-core/blob/master/example/discord.js
        return vc.join()
            .then((c) => {
                const stream = ytdl(url, {
                    filter: 'audioonly',
                });
                const dispatcher = c.playStream(
                    stream,
                    { passes: config.music.passes },
                );
                dispatcher.setVolume(config.music.volume);
                dispatcher.on('end', () => {
                    if (queue[message.guild.id] && queue[message.guild.id].length > 0) {
                        const newStream = ytdl(queue[message.guild.id].shift(), {
                            filter: 'audioonly',
                        });
                        c.playStream(
                            newStream,
                            { passes: config.music.passes },
                        ).setVolume(config.music.volume);
                    } else {
                        vc.leave();
                    }
                });
                message.channel.send(`Playing song at url:\n${url}`);
            })
            .catch(console.error);
    },

    pleasestop: (voiceConn, message) => {
        if (voiceConn) {
            return new Promise((resolve, reject) => {
                message.channel.send('Interrupting song...')
                    .then((promiseMessage) => {
                        const dispatcher = voiceConn.dispatcher;
                        dispatcher.end();
                        resolve(promiseMessage);
                    })
                    .catch(reject);
            });
        }
        return message.channel.send('Stop what?');
    },

    play: (voiceConn, message, _, config, url) => {
        if (queue[message.guild.id]) {
            queue[message.guild.id].push(url);
        } else {
            queue[message.guild.id] = [url];
        }
        if (!voiceConn) {
            module.exports.violence(voiceConn, message, _, config, queue[message.guild.id].shift);
        }
        return message.channel.send(`Added this song to the queue:\n${url}`);
            // .then(() => {
            //     const dispatcher = voiceConn.dispatcher;
            //     dispatcher.on('end', () => {
            //         module.exports.violence(voiceConn, message, config, _, url);
            //     });
            // });
    },
};
