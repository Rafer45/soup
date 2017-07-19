
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
        message.channel.send(bool ? 'Heads.' : 'Tails.');
    },

    dice: (message, _, __, n) => {
        n = Math.max(Number(n), 0) || 6;
        message.channel.send(Math.floor(Math.random() * n) + 1)
            .catch(message.channel.send('Input a valid number!'));
    },
};
