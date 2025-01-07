

import { asyncHandler } from '../utils/errors/asyncHandler.js';
import { sendMail } from '../utils/mail/MailNotification.js'; 

export const sendEmailController =asyncHandler( async(req, res) => {

const{to}=req.body;
if(!to){
  return res.status(400).json({message:'Missing required field to subject'})
}
  try {
    sendMail(to); 
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
})
