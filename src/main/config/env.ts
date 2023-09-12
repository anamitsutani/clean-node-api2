export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api2',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'atvSJ$_90a'
}
