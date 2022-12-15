const {Events} = require('discord.js');

// MessageCreate Event
const messageCreate = {
    name: Events.MessageCreate,
    execute(message) {
        if (message.author.bot || message.channel?.type !== 'GUILD_TEXT') return;

        // Message Parser
        const args = message.content.slice(process.env.PREFIX.length).trim().split(/\s+/g);
        const commandName = args.shift().toLowerCase();

        // Command Retrieval
        const command = message.client.commands.get(commandName);
        if (!command) return;

        // Command Execution
        try {
            command.execute(message, args);
        } catch(error) {
            console.error(error);
            message.reply('There was an error while executing this command.');
        }
    }
};

module.exports = messageCreate;
