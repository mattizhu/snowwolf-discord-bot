const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const moment = require('moment');

// Mongo Collection
const Projects = require('../../models/projects');

// Projects Command
const projectsCommand = {
    data: new SlashCommandBuilder()
        .setName('projects')
        .setDescription('Responds with current and upcoming projects.'),
    async execute(interaction) {
        const projects = await Projects.find();
        const currentProjects = projects.filter(project => project.category === 'current');
        const upcomingProjects = projects.filter(project => project.category === 'upcoming');

        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('🛠️ Snowwolf Projects')
            .setURL('https://mattwill.design')
            .setDescription('Below are the current and upcoming Snowwolf projects that are being worked on. Please note that these projects may be ideas and may not be continued in the near future or test/small projects that will be scrapped upon completion:')
            .addFields(
                {name: '📗 Current Projects', value: currentProjects.length ? currentProjects.map(project => `▫️ **${project.name}**\n${project.dateStart && project.dateEnd ? `${moment(project.dateStart).format('MMMM YYYY')} - ${moment(project.dateEnd).format('MMMM YYYY')}` : project.dateEnd ? moment(project.dateStart).format('MMMM YYYY') : `${moment(project.dateStart).format('MMMM YYYY')} - ${moment(project.createdAt).add(6, 'months').format('[Late] YYYY')}`}`).join('\n') : 'No current projects.'},
                {name: '📘 Upcoming Projects', value: upcomingProjects.length ? upcomingProjects.map(project => `▫️ **${project.name}**\n${project.dateStart && project.dateEnd ? `${moment(project.dateStart).format('MMMM YYYY')} - ${moment(project.dateEnd).format('MMMM YYYY')}` : project.dateEnd ? moment(project.dateStart).format('MMMM YYYY') : moment(project.createdAt).add(6, 'months').format('[Late] YYYY')}`).join('\n') : 'No upcoming projects.'}
            )
        await interaction.reply({embeds: [embed]});
    }
};

module.exports = projectsCommand;
