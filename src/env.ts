const requiredServerEnvs = [
    'TOKEN',
    'OPEN_AI',
    'CLIENT_ID',
    'INTRODUCTION_CHANNEL_ID',
] as const

type RequiredServerEnvKeys = (typeof requiredServerEnvs)[number]

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Record<RequiredServerEnvKeys, string>{}
    }
}

export {}