

export default {
    description: 'Pings everyone in the channel',
    type: 'CHATINPUT',
    callback: () => {
        return {
            content: '@everyone'
        }
    }
}