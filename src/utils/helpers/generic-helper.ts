var randomize = require('randomatic');
const nodemailer = require('nodemailer');
const cloudinary = require('cloudinary');
import * as bcrypt from 'bcrypt';

export const GeneratePassword = (pattern, length) => {
  return randomize(pattern, length);
};

export async function sendMail(email, htmlToSend, title) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'camila.kreiger82@ethereal.email',
      pass: 'njJTP84NYWE7H7Qjk1',
    },
  });

  let info = await transporter.sendMail({
    from: 'Car2Go <car2go@gmail.com>',
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

export async function uploadToCloudinary(fileBuffer, fileType, resUrl = true) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader
      .upload_stream({ resource_type: fileType }, (error, result) => {
        if (!error && result.url) {
          return resUrl ? resolve(result.url) : resolve(result);
        } else {
          return reject(error);
        }
      })
      .end(fileBuffer);
  });
}
