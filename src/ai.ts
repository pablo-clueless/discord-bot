import { Configuration, OpenAIApi } from 'openai'
import dotenv from 'dotenv'

dotenv.config()
const API_KEY = process.env.OPEN_AI as string

const config = new Configuration({
    apiKey: API_KEY,
})

const openai = new OpenAIApi(config)

export const ask = async(prompt: string) => {
    const response = await openai.createCompletion({
        model: 'text-davinci-002',
        prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    const answer = response.data.choices[0].text
    return answer
}