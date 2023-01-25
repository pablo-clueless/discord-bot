import './register'
import 'node:events'
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
// const offenders = new 

client.once(Events.ClientReady, () => {

    console.log('Jarvis is online!')
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
        if (answer.length > 2000) {
            let response = []
            // const chunker = /s[S]{1,2000}/g
            const chunk = answer.split('\n')
            response.push(chunk)
            for(let i = 0;i < response.length;i++) {
                message.channel.send(response[i])
            }
        } else {
            message.channel.send(answer)
        } 
    }
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.bot) return
    if(message.content.toLowerCase() === 'hey jarvis'){
        const username = message.author.username
        message.channel.send(`How can I help you @${username}`)
    }
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.bot) return
    if(message.content.substring(0, 1) === '!') {
        const question = message.content.substring(1)
        if(question.toLowerCase() === 'what is my name') {
            const username = message.author.username
            message.channel.send(`Your name is @${username}`)
        }
    }
})

client.login(TOKEN)