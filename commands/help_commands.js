
module.exports = {
    help: (message, config) => {
        const p = config.prefix;
        message.channel.send(
`\`\`\`diff
++ MUSIC COMMANDS ++
${p}play URL - Plays a song at a YouTube URL.
${p}stop     - Interrupts the current song.
${p}queue    - Says the current queue.
${p}pleasestop - Clears the queue and interrupts the current song.
${p}clearqueue - Clears the queue.

++ TESTING COMMANDS ++
${p}ping - Says "pong."
${p}echo text - Repeats whatever text is given.

++ RANDOMNESS COMMANDS ++
${p}coin - Says heads or tails.
${p}dice n - Says a random number between 1 and n. 6 is the default.
${p}factcheck fact - Uses advanced neural networks and quantum bubble extrapolation to calculate a fact's veracity. If no fact is provided, it will give a more general statement about the command user.

++ MISC. commands ++
${p}effify - Try it.
\`\`\``);
    },
};