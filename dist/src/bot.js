"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
const ai_1 = require("./ai");
dotenv_1.default.config();
const TOKEN = process.env.TOKEN;
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildBans,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
    partials: [discord_js_1.Partials.Channel]
});
// const offenders = new 
client.once('ready', () => {
    console.log('Jarvis is online!');
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === 'refresh') {
        await interaction.reply('Refresh done!');
    }
});
client.on('guildMemberAdd', async (member) => {
    const channelId = process.env.INTRODUCTION_CHANNEL_ID;
    const username = member.id;
    const welcomeMessage = `Hey @${username}, welcome to the server. Please read the #rules before anything else`;
    const channel = await member.guild.channels.fetch(channelId)
        .then((channel) => {
        // !ADD WELCOME MESSAGE
    });
});
client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.substring(0, 1) === '!') {
        const prompt = message.content.substring(1);
        const answer = await (0, ai_1.ask)(prompt);
        message.channel.send(answer);
    }
});
client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.toLowerCase() === 'hey jarvis') {
        const username = message.author.username;
        message.channel.send(`How can I help you @${username}`);
    }
});
client.login(TOKEN);
