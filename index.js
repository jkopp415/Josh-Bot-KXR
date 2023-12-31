// Import necessary Node functions
const fs = require('fs');
const path = require('path');

// Import necessary discord.js functions
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

// Import config items
const { token } = require('./config.json');

// Create the bot client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
    ], 
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction
    ]
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// Dynamically retrieve the event files
for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Dynamically retrieve the command files
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
    }
}

// Log the bot into the server
client.login(token);