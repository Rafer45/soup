
const ytdl = require('ytdl-core');

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
            // return module.exports.pleasestop(voiceConn, message)
            //     .then(() => {
            //         setTimeout(() => {
            //             module.exports.braindead(voiceConn, message, config, _, url);
            //         }, 1000);
            //     });
            return message.channel.send('Interrupting song...')
                .then(() => {
                    const dispatcher = voiceConn.dispatcher;
                    dispatcher.end();
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
                    vc.leave();
                });
                message.channel.send(`Playing song at url:\n${url}`);
            })
            .catch((error) => {
                console.error(error);
                message.channel.send('Something went wrong. Either the URL is invalid, or soup is having issues.');
            });
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

    // time: (voiceConn, message) => {
    //     if (voiceConn) {
    //
    //     }
    // }
};
