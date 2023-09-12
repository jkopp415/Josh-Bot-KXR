// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-help')
        .setDescription('Provides you with a bit of info about JoshBot\'s commands'),
    async execute(interaction) {

        let responseString = 'Here\'s a list of my commands:\n\n';

        interaction.client.commands.forEach(command => {
            responseString = responseString.concat('**/', command.data.name, '** - ', command.data.description, '\n');
        });

        interaction.reply({ content: responseString, ephemeral: true });

    }
}