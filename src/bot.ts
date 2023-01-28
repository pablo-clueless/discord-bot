import { Client, Events, GatewayIntentBits, Partials } from 'discord.js'
import dotenv from 'dotenv'

import { ask } from './ai'
import main from './modules/register'
import { getCoursesByDay } from './commons/utils/timetable'
import { channel } from 'diagnostics_channel'

dotenv.config()

const TOKEN = process.env.TOKEN as string
const CHANNEL_ID = process.env.CHANNEL_ID as string

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

client.once(Events.ClientReady, (client) => {
    console.log(`Bot is online! Logged in as ${client.user.username.toUpperCase()}`)
})

client.on(Events.ClientReady, async(client) => {
    const hours = new Date().getHours()
    const timetable = getCoursesByDay()
    if(hours === 12) {
        const channel = await client.channels.cache.find((channel) => channel.id === CHANNEL_ID)
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

client.on(Events.MessageCreate, async(message) => {
    if(message.author.bot) return
    if(message.content.toLowerCase() === 'hey jarvis'){
        const username = message.author.username
        message.channel.send(`How can I help you @${username}`)
    }
})

// main()
client.login(TOKEN)