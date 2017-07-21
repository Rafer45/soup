
module.exports = {
    factcheck: (message, _, msg) => {
        const bool1 = (Math.random() > 0.5);
        const bool2 = (Math.random() > 0.5);
        let str;

        if (msg) {
            str = `${message.author}'s claim, "${msg}",`;
            str = bool1 ? `${str} is obviously ${bool2.toString()}.`
                        : `${str} can't possibly be ${bool2.toString()}.`;
        } else {
            str = bool1 ? `${message.author} is always ${bool2 ? 'right' : 'wrong'}.`
                        : `${message.author} is never ${bool2 ? 'right' : 'wrong'}.`;
        }
        message.channel.send(str);
    },

    coin: (message) => {
        const bool = (Math.random() > 0.5);
        const headsUrl = 'http://www.antheads.co.uk/_/rsrc/1467896244461/catguide/heads/Heads-21-30.jpg';
        const tailsUrl = 'https://upload.wikimedia.org/wikipedia/en/7/73/Sonicchannel_tails_cg.png';
        message.channel.send(bool ? `Heads.\n${headsUrl}`
                                  : `Tails.\n${tailsUrl}`);
    },

    dice: (message, _, __, n) => {
        n = Math.max(Number(n), 0) || 6;
        message.channel.send(Math.floor(Math.random() * n) + 1)
            .catch(() => message.channel.send('Input a valid number!'));
    },
};
