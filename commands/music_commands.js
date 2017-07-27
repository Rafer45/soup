
const ytdl = require('ytdl-core');

const queues = {};
// Most braindead play command possible.
// Will play a song to its conclusion with no way to stop it.
// Just a bit of an exercise for now.
module.exports = {
    fn: command => (
        (message, ...other) => {
            command(message.guild.voiceConnection, message, ...other);
        }
    ),

    braindead: (voiceConn, message, config, _, url) => {
        if (voiceConn) {
            return module.exports.pleasestop(voiceConn, message)
                .then(() => {
                    setTimeout(() => {
                        module.exports.braindead(null, message, config, _, url);
                    }, 500);
                })
                .catch(console.error);
        }

        const vc = message.member.voiceChannel;
        if (!vc) {
            return message.reply('Join a voice channel before using the command.');
        }
        if (!url) {
            if (queues[message.guild.id].length > 0) {
                return module.exports.braindead(
                    null,
                    message,
                    config,
                    _,
                    queues[message.guild.id].shift(),
                );
            }
            return message.reply('Provide a valid URL or add something to the queue.');
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
                    if (queues[message.guild.id].length > 0) {
                        setTimeout(() => {
                            module.exports.braindead(
                                null,
                                message,
                                config,
                                _,
                                queues[message.guild.id].shift(),
                            );
                        }, 500);
                    } else {
                        vc.leave();
                    }
                });
                message.channel.send(`Playing song at url:\n${url}`);
            })
            .catch((error) => {
                console.error(error);
                message.channel.send('Something went wrong. Either the URL is invalid, or soup is having issues.');
            });
    },

    stop: (voiceConn, message) => {
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

    pleasestop: (voiceConn, message) => {
        message.channel.send('Clearing queue...').then(() => {
            queues[message.guild.id] = [];
            module.exports.stop(voiceConn, message);
        });
    },

    enqueue: (voiceConn, message, config, _, url) => {
        if (queues[message.guild.id]) {
            queues[message.guild.id].push(url);
        } else {
            queues[message.guild.id] = [url];
        }
        message.channel.send(`Enqueued song at url ${url}.`);
        console.log(queues);
    },

    // time: (voiceConn, message) => {
    //     if (voiceConn) {
    //
    //     }
    // }
};
