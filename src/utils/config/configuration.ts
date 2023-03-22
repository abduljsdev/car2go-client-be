export default () => ({
  ports: {
    main: parseInt(process.env.PORT) || 3000,
    socket: 3005,
  },
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    databaseName: process.env.DB_DATABASE_NAME,
    sync: process.env.DB_SYNC,
  },

  cloudinary: {
    name: process.env.CLOUDINARY_ClOUD_NAME,
    key: process.env.CLOUDINARY_API_KEY,
    secret: process.env.CLOUDINARY_API_SECRET,
  },
  mail: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    mail: process.env.SMTP_MAIL,
    password: process.env.SMTP_PASSWORD,
  },
  jwt: {
    expiry: parseInt(process.env.JWT_EXPIRY),
    secret: process.env.JWT_SECRET,
  },
  jwtVerification: {
    secret: process.env.JWT_VERIFICATION_TOKEN_SECRET,
    expiry: parseInt(process.env.JWT_VERIFICATION_TOKEN_EXPIRATION_TIME),
    confirmUrl: process.env.EMAIL_CONFIRMATION_URL,
  },
});
