// Import nodejs file functions
const path = require('path');

// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

// Import the path to the reaction images folder
const reactionImgsPath = path.join(__dirname, '../assets/reactions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-reaction')
        .setDescription('Replies with a specified reaction image')
        .addStringOption(option =>
            option.setName('image')
                .setDescription('The name of the reaction image to send')
                .setRequired(true)
                .addChoices(        // The choices here are mapped to the corresponding file name
                    { name: 'almost gave a fuck', value: 'almost-gave-a-fuck.jpg' },
                    { name: 'cat wolf', value: 'cat-wolf.jpg' },
                    { name: 'chicken', value: 'chicken.jpg' },
                    { name: 'cyber bullied', value: 'cyber-bullied.jpg' },
                    { name: 'did i ask', value: 'did-i-ask.jpg' },
                    { name: 'hoes mad', value: 'hoes-mad.jpg' },
                    { name: 'hold this L', value: 'hold-this-L.jpg' },
                    { name: 'keep going', value: 'keep-going.jpg' },
                    { name: 'yooper', value: 'yooper.jpg' },
                    { name: 'youre', value: 'youre.jpg' },
                )
        ),
    async execute(interaction) {

        // Reply to the interaction event with the specified image
        const imageName = interaction.options.get('image').value;
        const imagePath = path.join(reactionImgsPath, imageName);
        await interaction.reply({ files: [imagePath] });

    }
};