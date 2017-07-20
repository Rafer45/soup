
// const fs = require('fs');
// const musicCommand = require('./commands/music.js');
const {
    musicCommands,
    randomnessCommands,
    sillyCommands,
    soupmasterCommands,
    testingCommands,
} = require('./commands/');

// console.log(musicCommands);

// const musicCommands = require('./commands/music_commands');
// const randomnessCommands = require('./commands/randomness_commands');
// const sillyCommands = require('./commands/silly_commands');
// const soupmasterCommands = require('./commands/soupmaster_commands');
// const testingCommands = require('./commands/testing_commands');

// Commands are called in the following manner:
// commands[command](message, config, msg, ...parameters)
// msg is the message content without the prefix or command
module.exports = {};

/* eslint dot-notation: "warn" */
function addCommands(...objs) {
    objs.forEach((obj) => {
        const fn = obj.fn || (x => x);
        Object.keys(obj).filter(x => x !== 'fn').forEach((k) => {
            module.exports[k] = fn(obj[k]);
        });
    });
}

addCommands(
    musicCommands,
    randomnessCommands,
    soupmasterCommands,
    sillyCommands,
    testingCommands,
);
