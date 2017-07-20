
const {
    musicCommands,
    randomnessCommands,
    sillyCommands,
    soupmasterCommands,
    testingCommands,
} = require('./commands/');

module.exports = {};

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
