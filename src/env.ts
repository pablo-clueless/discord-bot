const requiredServerEnvs = [
    'TOKEN',
    'OPEN_AI',
    'CLIENT_ID',
    'CHANNEL_ID',
    'PORT',
] as const

type RequiredServerEnvKeys = (typeof requiredServerEnvs)[number]

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Record<RequiredServerEnvKeys, string>{}
    }
}

export {}