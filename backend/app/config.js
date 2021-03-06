export default {
  db: {
    host: process.env.DB_HOST,
    name: 'chat',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
  },
  http: {
    port: process.env.PORT,
  },
};
