const { join } = require("path");
const configPath = join(process.cwd(), "config", ".env");
require("dotenv").config({ path: configPath });
const sg = require("@sendgrid/mail");
sg.setApiKey(process.env.SENDGRID_KEY);

class EmailService {
  sendEmail = async (email, verificationToken) => {
    const emailStructure = {
      from: "dao426474@gmail.com",
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="http://localhost:${process.env.PORT}/users/verify/${verificationToken}">Verify your email</a>`,
    };

    return sg.send(emailStructure);
  };
}

module.exports = new EmailService();
