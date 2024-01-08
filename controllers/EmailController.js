const EmailService = require("../services/EmailService");

class EmailController {
  constructor() {
    this.service = EmailService;
  }

  sendEmail = async (email, verificationToken) => {
    const email = await this.service.sendEmail(email, verificationToken);
  };
}
