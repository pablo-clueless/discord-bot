import { SlashCommandBuilder } from 'discord.js'

export const SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('refresh')
        .setDescription('refreshes the server'),
    async execute(interaction) {
        await interaction.reply('server refreshed')
    }
}