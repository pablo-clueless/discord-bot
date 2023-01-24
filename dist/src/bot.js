"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import './register'
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
client.once(discord_js_1.Events.ClientReady, () => {
    console.log('Jarvis is online!');
});
client.on(discord_js_1.Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    if (interaction.commandName === 'refresh') {
        await interaction.reply('Refresh done!');
    }
});
client.on(discord_js_1.Events.MessageCreate, async (message) => {
    if (message.author.bot)
        return;
    if (message.content.substring(0, 1) === '!') {
        const prompt = message.content.substring(1);
        const answer = await (0, ai_1.ask)(prompt);
        message.channel.send(answer);
    }
});
client.login(TOKEN);
//# sourceMappingURL=bot.js.map