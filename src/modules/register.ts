import { REST, Routes } from 'discord.js'
import dotenv from 'dotenv'

import { Commands } from '../commons/config/commands'

dotenv.config()
const TOKEN = process.env.TOKEN as string
const CLIENT_ID = process.env.CLIENT_ID as string

const rest = new REST({version: '10'}).setToken(TOKEN)

const main = async() => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: Commands })
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error)
    }
}

export default main