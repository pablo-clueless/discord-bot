import './register'
import 'node:events'
import dotenv from 'dotenv'
import { Client, Collection, Events, GatewayIntentBits, Partials } from 'discord.js'

import { ask } from './ai'
import { getCoursesByDay } from './commons/utils/timetable'

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

// const offenders = new Collection()

client.once(Events.ClientReady, () => {
    console.log('Jarvis is online!')
})

client.once(Events.ClientReady, async(client) => {
    const hours = new Date().getHours()
    const timetable = getCoursesByDay()
    if(hours === 12) {
        const channel = await client.channels.fetch('')
    }
})

client.on(Events.InteractionCreate, async(interaction) => {
    if(!interaction.isChatInputCommand()) return
    if(interaction.commandName === 'refresh') {
        await interaction.reply('Refresh done!')
    }
})

client.on(Events.GuildMemberAdd, async(member) => {
    const channelId = process.env.INTRODUCTION_CHANNEL_ID as string
    const username = member.id
    const welcomeMessage = `Hey @${username}, welcome to the server. Please read the #rules before anything else`
    const channel = await member.guild.channels.fetch(channelId)
    .then((channel) => {
        // !ADD WELCOME MESSAGE
    })
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