export const EnvConfiguration = () => ({

    environment: process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: Number(process.env.PORT) || 3002,
    defaultLimit: Number(process.env.DEFAULT_LIMIT) || 7,

})