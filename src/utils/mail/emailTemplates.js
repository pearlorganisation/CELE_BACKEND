import { sendMail } from "./sendEmail.js";

export const sendSignupMail = async (email, signUptoken) => {
  const subject = "Email Verification";
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_BASE_URL // Production URL
      : process.env.DEV_BASE_URL; // Development URL
  const emailVerificationLink = `${baseUrl}/api/v1/auth/verify-signup/${signUptoken}`;

  //   console.log(emailVerificationLink, "my email link ");
  const templateName = "emailVerification";
  const data = { emailVerificationLink };

  console.log(data, "my data");

  return sendMail(email, subject, templateName, data);
};

export const sendForgotPasswordMail = async (email, resetToken, role) => {
  const subject = "Password reset request";
  const forgotPasswordResetLink =
    role === "ADMIN"
      ? `${process.env.ADMIN_RESET_PASSWORD_PAGE_URL}/${resetToken}`
      : `${process.env.FRONTEND_RESET_PASSWORD_PAGE_URL}/${resetToken}`;
  const templateName = "forgotPasswordEmail";
  const data = { forgotPasswordResetLink };

  return sendMail(email, subject, templateName, data);
};
