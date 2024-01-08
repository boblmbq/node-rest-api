const { join } = require("path");
const configPath = join(process.cwd(), "config", ".env");
require("dotenv").config({ path: configPath });
const sg = require("@sendgrid/mail");
const HTTPError = require("./HTTPError");
sg.setApiKey(process.env.SENDGRID_KEY);

class EmailService {
  sendEmail = async (email, verificationToken) => {
    const email = {
      from: "dao426474@gmail.com",
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:${process.env.PORT}/users/verify/${verificationToken}">Verify your email</a>`,
    };
    
    try {
      sg.send(email);
      return true;
    } catch (error) {
      HTTPError(500, "Server error");
    }
  };
}

module.exports = new EmailService();
