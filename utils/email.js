const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.displayName = user.displayName;
    this.url = url;
    this.from = `Nick de Waal <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Activate in gmail 'less secure app' option -> if you want to use gmail (we will not)
    });
  }

  async send(template, subject) {
    // Send the actual email
    // 1)  Render hTML based on a pug template

    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      displayName: this.displayName,
      url: this.url,
      subject,
    });

    // 2) Define the email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3)  Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Connect Four!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
};
