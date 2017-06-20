
module.exports = {
    'ping': (message) => {
        message.reply("pong!");
    },

    'echo': (message, _, msg) => {
        if (msg) {
            message.channel.send(msg);
        }
    },

    'prefix': (message, _, __, newPrefix) => {
        if (newPrefix) {
            config.prefix = newPrefix;
            fs.writeFile("./config.json", JSON.stringify(config, null, 4), err => console.error);
            message.channel.send(`Prefix successfully set to '${newPrefix}'`)  
        } else {
            message.channel.send("Please provide a prefix.");
        }
    },

    'die': (message, soupmaster) => {
        if (message.author.id === soupmaster.id) {
            message.channel.send("Emptying can...")
                .then(() => {
                    console.log("Forced to disconnect.");
                    process.exit(0);
                });
        }
    },

    'factcheck': (message, _, msg) => {
        let bool1 = (Math.random() > 0.5)
        let bool2 = (Math.random() > 0.5)
        let str;

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

    'dice': (message) => {
        message.channel.send(Math.floor(Math.random()*6) + 1);
    }
}