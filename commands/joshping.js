// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-ping')
        .setDescription('Pong!'),
    async execute(interaction) {

        await interaction.reply('Pong!')

    },
};