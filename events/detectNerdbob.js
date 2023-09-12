const fs = require('fs');
const path = require('path');

// Import DiscordJS variables
const { Events } = require('discord.js');

// Import config properties
const { nerdbobBotEmoji } = require('../config.json');

// Import the nerdbob leaderboard file
const leaderboardFile = path.join(__dirname, "../assets/nerdbob_leaderboard.json")

module.exports = {
    name: Events.MessageReactionAdd,
    async execute(reaction, user) {

        // If a reaction is added to a message from when before the bot was activated, you must fetch the message
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        // Get the name of the reaction emoji and the id of who sent it
        let reactionName = reaction.emoji.name;
        let receiver = reaction.message.author.id;

        // Only execute if the reaction is a nerdbob
        if (reactionName == nerdbobBotEmoji) {

            try {
                // Read in and parse the existing data in the leaderboard file
                let leaderboardData = fs.readFileSync(leaderboardFile);
                leaderboardData = JSON.parse(leaderboardData);
    
                // If the receiver is already inside the leaderboard file, add 1 to their score
                // Otherwise, add them to the file
                if ((user = leaderboardData.nerdbobs.find(i => i.userId === receiver)) != null) {
                    user.score += 1;
                } else {
                    leaderboardData.nerdbobs.push({
                        "userId": receiver,
                        "score": 1
                    })
                }
    
                // Write the new JSON object to the leaderboard file
                fs.writeFileSync(leaderboardFile, JSON.stringify(leaderboardData));
            } catch (error) {
                console.log(error);
            }

        }
    }
};