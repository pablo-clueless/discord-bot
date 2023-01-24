// import './register'
import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import dotenv from 'dotenv'

import { ask } from './ai'

dotenv.config()

const TOKEN = process.env.TOKEN as string

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel]
})

client.once(Events.ClientReady, () => {
    console.log('Jarvis is online!')
})

client.on(Events.InteractionCreate, async(interaction) => {
    if(!interaction.isChatInputCommand()) return
    if(interaction.commandName === 'refresh') {
        await interaction.reply('Refresh done!')
    }
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.bot) return
    if(message.content.substring(0, 1) === '!'){
        const prompt = message.content.substring(1)
        const answer = await ask(prompt)
        message.channel.send(answer)
    }
})

client.login(TOKEN)