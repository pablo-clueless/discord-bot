import { Message } from 'discord.js'

module.exports = {
    minArgs: 1,
    expectedArgs: '<Channel name>',
    callback: (message: Message, args) => {
        const channel = message.mentions.channels.first()
        if(!channel) {
            message.reply('Please specify a channel to ping.')
            return
        }
        
    }
}