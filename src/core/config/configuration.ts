export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  env: process.env.ENV,
  database: {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: process.env.ENV === 'local' ? ['dist/**/*.entity{.ts,.js}'] : [],
    synchronize: process.env.ENV === 'local' ? true : false,
  },
});
