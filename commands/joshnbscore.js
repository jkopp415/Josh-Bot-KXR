const fs = require('fs');
const path = require('path');

// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

// Import config properties
const { enableNerdbobBot } = require('../config.json');

// Import the nerdbob leaderboard file
const leaderboardFile = path.join(__dirname, "../assets/nerdbob_leaderboard.json")

// Adds correct ordinal indicator to a given number
function addOrdinalIndicator(i) {
    let j = i % 10;
    let k = i % 100;

    if (j == 1 && k != 11) {
        return i + 'st';
    }
    if (j == 2 && k != 12) {
        return i + 'nd';
    }
    if (j == 3 && k != 13) {
        return i + 'rd';
    }
    return i + 'th';
}

// TODO: Only allow run based on config option

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-nb-rank')
        .setDescription('Shows your rank on the nerdbob leaderboard.')
        .addUserOption(option =>
            option.setName('username')
                .setDescription('The user who you would like to check')
                .setRequired(false)
        ),
    async execute(interaction) {

        if(!enableNerdbobBot)
            return;

        // Get a list of all the members from the server and filter out any bots
        let memberList = await interaction.guild.members.fetch();

        // Create empty variables for the response string and member in which to check for nerdbobs
        let responseString = '';
        let checkedMember = null;

        if ((userArg = interaction.options.getUser('username')) != null) {
            // Run the query on the member matching the user argument
            checkedMember = memberList.find(m => {
                return m.user === userArg;
            });
        } else {
            // If the user argument is null, run the query on the member who ran the command
            checkedMember = interaction.member;
        }

        try {

            // Open the leaderboard file and parse the JSON content
            let leaderboardData = fs.readFileSync(leaderboardFile);
            leaderboardData = JSON.parse(leaderboardData);

            // Sort the leaderboard in order of decreasing nerdbob counts
            let leaderboardList = leaderboardData.nerdbobs.sort(function(a, b) {
                return b.score - a.score;
            });

            // Get the member's server nickname, getting their display name if the nickname is null
            let nickname = '';
            if ((nickname = checkedMember.nickname) == null) {
                nickname = checkedMember.user.username;
            }

            // If the checked member's ID is in the leaderboard file, get the rank and prepare a return message
            // Otherwise, prepare a return message saying that the member has no nerdbobs
            if ((leaderboardUser = leaderboardList.find(i => i.userId === checkedMember.id)) != null) {
                rank = leaderboardList.indexOf(leaderboardUser) + 1
                responseString = responseString.concat(
                    'User **', nickname, '** is in **', addOrdinalIndicator(rank), ' place** with **', leaderboardUser.score, '** nerdbobs'
                );
            } else {
                responseString = responseString.concat('User **', nickname, '** has zero nerdbobs');
            }

        } catch (error) {
            console.log(error);
        }

        // Send the return message previously prepared
        await interaction.reply({
            content: responseString,
            ephemeral: true
        });

    }
};