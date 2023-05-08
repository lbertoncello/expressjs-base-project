export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET_DEV,
    jwtExp: '100d',
  },
  dbUrl: process.env.MONGO_URI_DEV,
  isDev: true,
}