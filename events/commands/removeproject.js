const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const moment = require('moment');

// Mongo Collection
const Projects = require('../../models/projects');

// Remove Project Command
const removeProjectCommand = {
    data: new SlashCommandBuilder()
        .setName('removeproject')
        .setDescription('Remove a project from the list of Snowwolf projects')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the project you want to remove.')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const name = interaction.options.getString('name');

        try {
            const project = await Projects.findOneAndDelete({name: name});
            if (project) await interaction.reply(`Project **${project.name}** has been removed from the project list.`);
            else await interaction.reply(`Unable to find project **${name}** in the project list to remove.`);
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = removeProjectCommand;
