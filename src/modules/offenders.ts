import { Client, Collection, Events, GuildMember } from 'discord.js'

const useOffender = (member: GuildMember) => {
    const client = new Client({intents: []})
    const offenders = new Collection()
    
    const checkOffender = () => {
        client.on(Events.MessageCreate, (message) => {
            if(message.content.toLowerCase().includes('fuck')) {}
        })
    }

    const addOffender = () => {}

    return {addOffender, checkOffender}
}