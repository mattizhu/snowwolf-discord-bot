const {Events} = require('discord.js');

// InteractionCreate Event
const InteractionCreate = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);

        try {
            await command.execute(interaction);
        } catch(error) {
            console.error(error);
            await interaction.reply({content: 'There was an error while executing this command.', ephemeral: true});
        }
        console.log(interaction);
    }
};

module.exports = InteractionCreate;
