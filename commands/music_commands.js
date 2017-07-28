
const ytdl = require('ytdl-core');

const queues = {};

module.exports = {
    play: (message, config, _, url) => {
        enqueue(message, url)
            .then(() => {
                const voiceConn = message.guild.voiceConnection;

                if (voiceConn) {
                    return false;
                }

                const vc = message.member.voiceChannel;

                if (!vc) {
                    return message.reply('Join a voice channel before using the command.');
                }

                return vc.join()
                    .then(dispatch.bind(
                            null,
                            message,
                            queues[message.guild.id].shift().url,
                            config,
                        ));
            })
            .catch(console.error);
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

    queue: (message) => {
        const q = queues[message.guild.id] || [];
        if (q.length === 0) {
            message.channel.send('Queue is empty');
        } else {
            const cb = '```';
            const qStr = q.map(elem => (
                `${elem.title} - Requested by ${elem.requester}`
            )).join('\n');
            message.channel.send(`${cb}${qStr}${cb}`);
        }
    },
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
                        queues[message.guild.id].shift().url,
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

function enqueue(message, url) {
    queues[message.guild.id] = queues[message.guild.id] || [];

    return new Promise((resolve, reject) => {
        ytdl.getInfo(url, (e, info) => {
            if (e) {
                message.channel.send('Invalid YouTube URL.');
                reject(e);
            } else {
                queues[message.guild.id].push({
                    'url': url,
                    'title': info.title,
                    requester: message.author,
                });
                message.channel.send(`Enqueued **${info.title}**.`);
                resolve();
            }
        });
    });
}
