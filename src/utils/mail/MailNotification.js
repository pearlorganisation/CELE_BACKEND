import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
const transporter= nodemailer.createTransport({
    service:"gmail",
    auth:{
    user: process.env.NODEMAILER_EMAIL_USER,
    pass: process.env.NODEMAILER_EMAIL_PASS,
  },}) 


  const mailOptions={
    from:process.env.NODEMAILER_EMAIL_USER,

subject:"nightly reminder",
text: 'This is a reminder email.'}


  export function sendMail() {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
  
