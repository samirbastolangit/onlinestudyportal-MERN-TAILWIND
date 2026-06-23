const transporter = require("../config/mailConfig");

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Welcome",
    html: `
      <h2>Hello ${name}</h2>
      <p>Thank you for registering.</p>
    `,
  };

  await transporter.sendMail(mailOptions,(error, info) =>{
        if(error){
                return console.log(`nodemailer error occur-${error}`);
        }
        else{
                return console.log('Email sent ',info.response);
        }
  });
};

module.exports = {
  sendWelcomeEmail,
};