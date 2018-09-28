
const fs = require('fs');

const commandGroups = [];

fs.readdirSync('./commands')
    .filter(str => str.endsWith('.js'))
    .map(str => str.slice(0, -3))
    .forEach((filename) => {
        console.log(filename);
        commandGroups.push(require(`./commands/${filename}`));
    });

module.exports = {};

addCommands(...commandGroups);


function addCommands(...objs) {
    objs.forEach((obj) => {
        
        // fn to apply on command is just identity by default
        const fn = obj.fn || (x => x);

        Object.keys(obj)
            .filter(x => x !== 'fn')
            .forEach((k) => {
                module.exports[k] = fn(obj[k]);
            });
    });
}
