import { SlashCommandBuilder } from 'discord.js'

module.exports = {
    data: new SlashCommandBuilder()
                .setName('ping')
                .setDescription('Pings all members in a channel.'),
    async execute (interaction) {
        await interaction.reply('@everyone')
    },
}