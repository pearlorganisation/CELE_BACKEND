import jwt from "jsonwebtoken";

export const generateSignUpToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d", // Set to min later
  });
  console.log(`token: ${token}`);
  return token;
};

export const generateForgotPasswordResetToken = (data) => {
  const token = jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d", // Set to min later
  });
  return token;
};
