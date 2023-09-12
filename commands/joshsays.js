// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

// Import config properties
const { adminUser } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-says')
        .setDescription('Makes the bot say something (if you have permission)')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('What you would like the bot to say')
                .setRequired(true)
        ),
    async execute(interaction) {

        if (interaction.user.username !== adminUser) {
            interaction.reply({ content: 'You don\'t have the right permissions, stop it.', ephemeral: true });
        } else {
            interaction.reply({ content: 'Sending message...', ephemeral: true });
            const message = interaction.options.getString('message');
            interaction.channel.send(message);
        }

    }
};
