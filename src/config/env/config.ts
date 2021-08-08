export default {
  mysql: {
    database: process.env.MYSQL_DATABASE || '',
    host: process.env.MYSQL_HOST || '',
    port: process.env.MYSQL_PORT || '',
    user: process.env.MYSQL_USER || '',
    pass: process.env.MYSQL_PASS || '',
    options: {}
  },

  jwtSecret: process.env.JWT_SECRET || '',
}