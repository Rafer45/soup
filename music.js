
const ytdl = require('ytdl-core');

// Most braindead play command possible.
// Will play a song to its conclusion with no way to stop it.
// Just a bit of an exercise for now.
module.exports = (message, config, msg, url) => {
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
                { passes: config.passes },
            );
            dispatcher.on('end', () => {
                vc.leave();
            });
            message.channel.send(`Playing song at url:\n${url}`);
        })
        .catch(console.error);
};
