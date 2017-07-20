
module.exports = {
    ping: (message) => {
        message.reply('pong!');
    },

    echo: (message, _, msg) => {
        if (msg) {
            message.channel.send(msg);
        }
    },
};
