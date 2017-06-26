const fs = require('fs');

// Commands are called in the following manner:
// commands[command](message, config, msg, ...parameters)
// msg is the message content without the prefix or command
module.exports = {
    'ping': (message) => {
        message.reply("pong!");
    },

    // _ denotes arguments we don't care about
    'echo': (message, _, msg) => {
        if (msg) {
            message.channel.send(msg);
        }
    },

    'prefix': (message, config, _, newPrefix) => {
        if (newPrefix) {
            config.prefix = newPrefix;
            fs.writeFile("./config.json", JSON.stringify(config, null, 4), err => console.error);
            message.channel.send(`Prefix successfully set to '${newPrefix}'`)
        } else {
            message.channel.send("Please provide a prefix.");
        }
    },

    'die': (message, config) => {
        if (message.author.id === config.ids.soupmaster) {
            message.channel.send("Emptying can...")
                .then(() => {
                    console.log("Forced to disconnect.");
                    process.exit(0);
                });
        }
    },

    'factcheck': (message, _, msg) => {
        let bool1 = (Math.random() > 0.5),
            bool2 = (Math.random() > 0.5),
            str;

        if (msg) {
            str = `${message.author}'s claim, "${msg}",`
            str = bool1 ? `${str} is obviously ${bool2.toString()}.`
                        : `${str} can't possibly be ${bool2.toString()}.`;
        } else {
            str = bool1 ? `${message.author} is always ${bool2 ? "right" : "wrong"}.`
                        : `${message.author} is never ${bool2 ? "right" : "wrong"}.`
        }
        message.channel.send(str);
    },

    'coin': (message) => {
        let bool = (Math.random() > 0.5);
        message.channel.send(bool ? "Heads." : "Tails.");
    },

    'dice': (message, _, __, n) => {
        n = Math.max(parseInt(n), 0) || 6;
        message.channel.send(Math.floor(Math.random()*n) + 1);
    },

    'effify': (message, _, msg) => {
        let effify = (str) => {
            let dict = {
                'á': 'a',
                'é': 'e',
                'í': 'i',
                'ó': 'o',
                'ú': 'u',
                'ï': 'i',
                'ü': 'u'
            };

            return str.replace(/[aeiouáéíóúü]/gi, char => (
                `${char}f${dict[char.toLowerCase()] || char.toLowerCase()}`
            ));
        };

        message.channel.send(effify(msg))
    }

}

// function effify(str, f, vowels, layers=1) {
//     str = str.toLowerCase()
    
//     if (layers < 1) {
//         return str
//     }
    
//     for (let i in vowels) {
//         str = insertF(vowels[i], str)
//     }

//     return effify(str, f, vowels, layers - 1)
    
//     function insertF(vowel, str) {
//         return str.split(vowel).join(vowel + f + vowel)
//     }
// }

// console.log(effify(input,"f",["a","e","i","o","u",
//                               "á","é","í","ó","ú"]))