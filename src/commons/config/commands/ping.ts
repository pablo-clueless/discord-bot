import { ApplicationCommandType, CommandInteraction, Client } from 'discord.js'

import { Command } from '../../interfaces'

export const Ping:Command = {
    name: 'ping',
    description: 'Pings everyone in the channel',
    type: ApplicationCommandType.ChatInput,
    run: async(client: Client, interaction: CommandInteraction) => {
        const content = '@everyone'
        await interaction.followUp({
            ephemeral: true,
            content,
        })
    }
}