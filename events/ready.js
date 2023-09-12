// Import DiscordJS variables
const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {

        console.log(`The bot has logged in as "${client.user.tag}"`)
        
    },
};