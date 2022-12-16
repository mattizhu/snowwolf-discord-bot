const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const moment = require('moment');

// Mongo Collection
const Projects = require('../../models/projects');

// Add Project Command
const addProjectCommand = {
    data: new SlashCommandBuilder()
        .setName('addproject')
        .setDescription('Add a project in the list of Snowwolf projects')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Name of the project you want to add.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('category')
                .setDescription('Category of the project.')
                .setRequired(true)
                .addChoices(
                    {name: 'Current', value: 'current'},
                    {name: 'Upcoming', value: 'upcoming'}
                ))
        .addStringOption(option =>
            option.setName('date_start')
                .setDescription(`Start date of the project. Example: ${moment().format('MMMM YYYY')}`))
        .addStringOption(option =>
            option.setName('date_end')
                .setDescription(`End date of the project. Example: ${moment().add(1, 'month').format('MMMM YYYY')}`))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        const category = interaction.options.getString('category');
        const dateStart = interaction.options.getString('date_start');
        const dateEnd = interaction.options.getString('date_end');

        const project = new Projects({name: name, category: category, dateStart: dateStart, dateEnd: dateEnd});

        try {
            await project.save();
            await interaction.reply(`Project **${name}** has been added to the project list.`);
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = addProjectCommand;
