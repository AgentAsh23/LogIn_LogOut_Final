const nodemailer = require('nodemailer');

const emailService = {
  sendWelcomeEmail: async (email) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shreyasm101@gmail.com', 
          pass: 'uohggoseplvmpvjw', 
        },
      });

      const mailOptions = {
        from: 'shreyasm101@gmail.com',
        to: email,
        subject: 'Welcome to YourApp',
        html: `Thank you for registering. Your account is now ready to use.`,
      };

      await transporter.sendMail(mailOptions);

      console.log(`Welcome email sent to: ${email}`);
    } catch (error) {
      console.error('Error sending welcome email:', error);
      throw error;
    }
  },
};

module.exports = emailService;
