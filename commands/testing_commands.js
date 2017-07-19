
module.exports = {
    ping: (message) => {
        message.reply('pong!');
    },

    // _ denotes arguments we don't care about
    echo: (message, _, msg) => {
        if (msg) {
            message.channel.send(msg);
        }
    },
};
