// Import nodejs file functions
const fs = require('fs');
const path = require('path');

// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

const spaceFactsFile = fs.readFileSync(path.join(__dirname, '../assets/space_facts.txt'), 'utf-8');
const spaceFacts = spaceFactsFile.split('\n');

function getRandomSpaceFact() {
    return spaceFacts[Math.floor(Math.random() * spaceFacts.length)];
}

function getSpecificSpaceFact(factNum) {
    return spaceFacts[factNum];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-space-fact')
        .setDescription('Replies with a random space fact')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription(`The specific quote you wish to print, between 1 and ${spaceFacts.length}`)
                .setRequired(false)
                .setMinValue(1)
                .setMaxValue(spaceFacts.length)
        ),
    async execute(interaction) {

        const spaceFactNum = interaction.options.getInteger('number');
        if (spaceFactNum != null) {
            await interaction.reply(getSpecificSpaceFact(spaceFactNum - 1));
        } else {
            await interaction.reply(getRandomSpaceFact());
        }

    },
};