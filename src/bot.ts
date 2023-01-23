import { Client, IntentsBitField } from 'discord.js'
import dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.TOKEN as string

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
    ]
})

client.on("ready", () => {
    console.log("Jarvis is online")
})
client.login(TOKEN)