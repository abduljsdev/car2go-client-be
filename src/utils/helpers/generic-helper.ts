var randomize = require('randomatic');
const nodemailer = require('nodemailer');
import * as bcrypt from 'bcrypt';

export const GeneratePassword = (pattern, length) => {
  return randomize(pattern, length);
};

export async function sendMail(email, htmlToSend, title) {
  const transporter = nodemailer.createTransport({
    // name: 'hostgator',
    // host: 'mail.aroma-secrets.com',
    // port: 465,
    // secure: true,
    // auth: {
    //   user: 'cs@aroma-secrets.com',
    //   pass: 'gb5nde1vbp64',
    // },
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'camila.kreiger82@ethereal.email',
      pass: 'njJTP84NYWE7H7Qjk1',
    },
  });

  let info = await transporter.sendMail({
    from: 'Aroma Survey <car2go@gmail.com>',
    to: `${email}`,
    subject: title,
    html: htmlToSend,
  });
  transporter.sendMail(info, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export function enCodePassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}

export function comparePassword(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}

export const checkFileMineType = (mineType) => {
  let fileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/tiff',
    'image/svg+xml',
  ];
  return fileTypes.includes(mineType);
};
