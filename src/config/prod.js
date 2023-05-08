export const config = {
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: '7d'
  },
  dbUrl: process.env.MONGO_URI,
  isDev: false,
}