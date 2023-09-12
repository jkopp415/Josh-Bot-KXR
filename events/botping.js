// Import nodejs file functions
const path = require('path');

// Import DiscordJS variables
const { Events } = require('discord.js');

// Import config properties
const { enableBotPing, clientId } = require('../config.json');

// The reaction image that is sent when the bot is pinged
const whoPingedMeGif = path.join(__dirname, '../assets/who_pinged_me.gif');

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {

        // If ComeBot is enabled and the message is one of the come words, respond with the image
        if (enableBotPing && interaction.mentions.has(clientId) && !interaction.mentions.everyone)
            await interaction.reply({ files: [whoPingedMeGif] });

    }
}