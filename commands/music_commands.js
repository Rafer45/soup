
const ytdl = require('ytdl-core');

const queues = {};

module.exports = {
    play: (message, config, _, url) => {
        module.exports.enqueue(message, null, null, url);
        const voiceConn = message.guild.voiceConnection;

        if (voiceConn) {
            return false;
        }

        const vc = message.member.voiceChannel;

        if (!vc) {
            return message.reply('Join a voice channel before using the command.');
        }

        if (queues[message.guild.id].length === 0) {
            return message.reply(`No songs in queue. Add songs with \`${config.prefix}enqueue\` or provide a url.`);
        }
        return vc.join()
            .then(dispatch.bind(
                    null,
                    message,
                    queues[message.guild.id].shift(),
                    config,
                ));
    },

    enqueue: (message, _, __, url) => {
        queues[message.guild.id] = queues[message.guild.id] || [];

        if (url) {
            ytdl.getInfo(url, (e, info) => {
                if (e) {
                    message.channel.send('Invalid YouTube URL.');
                } else {
                    queues[message.guild.id].push(url);
                    message.channel.send(`Enqueued *${info.title}*.`);
                }
            });
        }


        return console.log(queues);
    },

    stop: (message) => {
        const voiceConn = message.guild.voiceConnection;
        if (voiceConn) {
            return new Promise((resolve, reject) => {
                message.channel.send('Interrupting song...')
                    .then((_message) => {
                        const dispatcher = voiceConn.dispatcher;
                        dispatcher.end();
                        resolve(_message);
                    })
                    .catch(reject);
            });
        }
        return message.channel.send('Stop what?');
    },

    pleasestop: (message) => {
        module.exports.clearqueue(message)
            .then(module.exports.stop);
    },

    clearqueue: message => (
        new Promise((resolve, reject) => {
            message.channel.send('Queue cleared.').then((_message) => {
                queues[message.guild.id] = [];
                resolve(_message);
            }).catch(reject);
        })
    ),
};

function dispatch(message, url, config, connection) {
    const stream = ytdl(url, {
        filter: 'audioonly',
    });
    const dispatcher = connection.playStream(
        stream,
        { passes: config.music.passes },
    );
    dispatcher.setVolume(config.music.volume);
    dispatcher.on('end', () => {
        if (queues[message.guild.id].length > 0) {
            setTimeout(() => {
                dispatch(
                        message,
                        queues[message.guild.id].shift(),
                        config,
                        connection,
                    );
            }, 500);
        } else {
            message.channel.send('Queue is now empty.').then(() => {
                connection.channel.leave();
            });
        }
    });
    message.channel.send(`Playing song at url:\n${url}`);
}
