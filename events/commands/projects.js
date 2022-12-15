const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

// Help Command
const projectsCommand = {
    data: new SlashCommandBuilder()
        .setName('projects')
        .setDescription('Responds with current and upcoming projects.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor(0xFFFFFF)
            .setTitle('🛠️ Snowwolf Projects')
            .setURL('https://mattwill.design')
            .setDescription('Below are the current and upcoming Snowwolf projects that are being worked on. Please note that these projects may be ideas and may not be continued in the near future or test/small projects that will be scrapped upon completion:')
            .addFields(
                {name: '📗 Current Projects (2022-2023)', value: '**Snowwolf (v2) Discord Bot**\n*December 2022 - January 2023*\n\n**Portfolio (v3)**\n*November 2022 - February 2023*\n\n**The Snooker Hall Mobile App**\n*October 2022 - Late 2023*\n\n**Wordle Battle App**\n*October 2022 - Late 2023*'},
                {name: '📘 Upcoming Projects', value: '**Tournament Discord Bot & Desktop App**\n*Late 2023*\n\n**Minecraft Plugins**\n*Late 2023/2024*'}
            )
        await interaction.reply({embeds: [embed]});
    }
};

module.exports = projectsCommand;
