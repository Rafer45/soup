
// fs will be used for reading in saved static commands
const fs = require('fs');

module.exports = {
    fn: staticCommand => (
        (message) => {
            message.channel.send(staticCommand);
        }
    ),

    'shrug': '¯\\_(ツ)_/¯',
    'lennyflip': '(ノ͡° ͜ʖ ͡°)ノ︵┻┻',
    'turboflop': 'https://cdn.discordapp.com/attachments/72563303808774144/337010395837628416/tumblr_ohce3dBaw71re6agho1_500.gif',
};
