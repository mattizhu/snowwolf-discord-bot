const {SlashCommandBuilder, PermissionFlagsBits} = require('discord.js');
const moment = require('moment');

// Mongo Collection
const Projects = require('../../models/projects');

// Edit Project Command
const editProjectCommand = {
    data: new SlashCommandBuilder()
        .setName('editproject')
        .setDescription('Edit a project in the list of Snowwolf projects')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('Name of the project you want to edit.')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('updated_name')
                .setDescription('Updated name of the project.'))
        .addStringOption(option => 
            option.setName('category')
                .setDescription('Category of the project.')
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
        const updatedName = interaction.options.getString('updated_name');
        const category = interaction.options.getString('category');
        const dateStart = interaction.options.getString('date_start');
        const dateEnd = interaction.options.getString('date_end');

        try {
            const project = await Projects.findOne({name: name});
            if (project) {
                if (name) project.name = updatedName;
                if (category) project.category = category;
                if (dateStart) project.dateStart = dateStart;
                if (dateEnd) project.dateEnd = dateEnd;

                await project.save();
                await interaction.reply(`Project **${project.name}** has been edited in the project list.`);
            } else await interaction.reply(`Unable to find project **${name}** in the project list to edit.`)
        } catch(error) {
            console.error(error);
        }
    }
}

module.exports = editProjectCommand;
