const fs = require('fs');
const path = require('path');

// Import DiscordJS variables
const { SlashCommandBuilder } = require('discord.js');

// Import config properties
const { enableNerdbobBot } = require('../config.json');

// Import the nerdbob leaderboard file
const leaderboardFile = path.join(__dirname, "../assets/nerdbob_leaderboard.json")

// TODO: Only allow run based on config option

module.exports = {
    data: new SlashCommandBuilder()
        .setName('josh-nb-leaderboard')
        .setDescription('Lists the top 10 users with the most nerdbobs'),
    async execute(interaction) {

        if (!enableNerdbobBot)
            return;

        // Get a list of all the members from the server and filter out bots
        let memberList = await interaction.guild.members.fetch();
        memberList = memberList.filter((member) => !member.user.bot);

        // Begin the string displaying the leaderboard
        let responseString = 'The 10 users with the most nerdbobs:\n';

        try {

            // Open the leaderboard file and parse the JSON content
            let leaderboardData = fs.readFileSync(leaderboardFile);
            leaderboardData = JSON.parse(leaderboardData);

            // Sort the leaderboard in order of decreasing nerdbob counts
            let leaderboardList = leaderboardData.nerdbobs.sort(function(a, b) {
                return b.score - a.score;
            });

            // Loop through the first 10 members in the leaderboard
            for (i = 0; i < 10; i++) {
                curUser = leaderboardList[i]

                // For every existing member in the leaderboard, find their corresponding entry
                // in the member list
                if (curUser != null) {
                    tempUser = memberList.find(u => {
                        return u.user.id === curUser.userId;
                    });
                } else {
                    break;
                }

                // Get the member's server nickname, getting their display name if the nickname is null
                let nickname = '';
                if ((nickname = tempUser.nickname) == null) {
                    nickname = tempUser.user.displayName;
                }

                // Add each entry in the leaderboard to the response message
                responseString = responseString.concat(i + 1 + '. ' + nickname + ' (' + curUser.score + ' nerdbob');
                if (curUser.score === 1) {
                    responseString = responseString.concat(')\n');
                } else {
                    responseString = responseString.concat('s)\n');
                }
            }

        } catch (error) {
            console.log(error);
        }

        // Send the response message previously prepared
        await interaction.reply({
            content: responseString,
            ephemeral: true
        });

    }
};