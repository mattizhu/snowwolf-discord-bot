const {Events} = require('discord.js');

// Ready Event
const readyEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Snowwolf Discord Bot logged in as ${client.user.tag}`);
    }
};

module.exports = readyEvent;
