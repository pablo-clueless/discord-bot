import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.OPEN_AI as string

const config = new Configuration({
    apiKey: API_KEY,
})

const openai = new OpenAIApi(config)

export const ask = async(prompt: string) => {
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
        })
        const answer = response.data.choices[0].text
        return answer
    } catch (error) {
        console.log(error)
    }
}