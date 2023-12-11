
import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService{

    doNoting(){
        console.log("Do nothing shared service !");
        
    }

 async sendMail(email:any, htmlToSend:any, title:any) {
        const transporter = nodemailer.createTransport({
          host:process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure:false,
          auth: {
            user:process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
          },
        });
      
        let info = await transporter.sendMail({
          from: 'Car2Go <car2go@gmail.com>',
          to: email,
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
}