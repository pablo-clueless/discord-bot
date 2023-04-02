import { Client, Events, GatewayIntentBits, Partials, TextChannel } from 'discord.js'
import express, { Express, Request, Response } from 'express'
import WOK from 'wokcommands'
import dotenv from 'dotenv'
import http from 'http'
import cors from 'cors'
import path from 'path'

import { ask } from './ai'
import main from './modules/register'

dotenv.config()

const PORT = process.env.PORT as string
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

const app:Express = express()
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({message: "Discord bot is running"})
})

client.once(Events.ClientReady, (client) => {
    // new WOK({client, commandsDir: path.join(__dirname, 'commands'), mongoUri: ''})
    console.log(`bot is online; logged in as ${client.user.username}`)
})

client.on(Events.MessageCreate, async(message) => {
    if(message.author.bot) return
    if(message.content.substring(0, 1) === '!'){
        const prompt = message.content.substring(1)
        const answer = await ask(prompt)
        // message.channel.send(answer)
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
server.listen(PORT, () => console.log(`app running at port ${PORT}`))