
module.exports = {
    effify: (message, _, msg) => {
        if (!msg) {
            message.channel.send('Provide some text to effify.');
        } else {
            message.channel.send(effify(msg));
        }

        function effify(str) {
            const dict = {
                'á': 'a',
                'é': 'e',
                'í': 'i',
                'ó': 'o',
                'ú': 'u',
                'ï': 'i',
                'ü': 'u',
            };

            return str.replace(/[aeiouáéíóúü]/gi, char => (
                `${char}f${dict[char.toLowerCase()] || char.toLowerCase()}`
            ));
        }
    },
};
