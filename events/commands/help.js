const {SlashCommandBuilder} = require('discord.js');

// Help Command
const helpCommand = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Responds with a help section'),
    async execute(interaction) {
        await interaction.reply('Help section!');
    }
};

module.exports = helpCommand;
