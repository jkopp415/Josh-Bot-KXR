// Import nodejs file functions
const fs = require('fs');
const path = require('path');

// Import DiscordJS variables
const { Events } = require('discord.js');

// Import config properties
const { enableReactBot } = require('../config.json');

// Read in and parse the list of come words
const reactWordsFile = fs.readFileSync(path.join(__dirname, '../assets/react_words.txt'), 'utf-8');
var reactWords = reactWordsFile.split('\n');
reactWords = reactWords.map(reactWord => reactWord.replace('\r', ''));

// The reaction image for the come message
const nerdCatImg = path.join(__dirname, '../assets/nerd_cat.jpg');

// Check if the given message was found in the come words list
function checkReactWords(message) {
    message = message.replace(/(\r\n|\n|\r)/gm, "");
    return reactWords.includes(message);
}

module.exports = {
    name: Events.MessageCreate,
    async execute(interaction) {

        // If ComeBot is enabled and the message is one of the come words, respond with the image
        if (enableReactBot && checkReactWords(interaction.content))
            await interaction.reply({ files: [nerdCatImg] });

    }
}