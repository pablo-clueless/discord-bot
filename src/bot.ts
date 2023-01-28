import { REST, Client, Collection, Events, GatewayIntentBits, Partials, Routes } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

import { ask } from './ai'
import { getCoursesByDay } from './commons/utils/timetable'

dotenv.config()

const TOKEN = process.env.TOKEN as string
const CLIENT_ID = process.env.CLIENT_ID as string

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

client.once(Events.ClientReady, async(client) => {
    const hours = new Date().getHours()
    const timetable = getCoursesByDay()
    if(hours === 12) {
        const channel = await client.channels.fetch('')
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

client.login(TOKEN)