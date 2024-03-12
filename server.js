// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Nodemailer transporter setup
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'your-email@gmail.com', // Your Gmail email address
//     pass: 'your-gmail-password' // Your Gmail password
//   }
// });
const transporter = nodemailer.createTransport({
    //  host: "smtp.ethereal.email",
    //  port: 587,
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      //  user: "isai.thompson93@ethereal.email",
      user: "vaibhavrathorema@gmail.com",
      pass: "rsjm bgsh rcyt jcux",
    },
  });
// Endpoint to handle form submission
app.post('/send-email', (req, res) => {
  const { name, email, number, message } = req.body;

  // Email content
  const mailOptions = {
    from: '"vaibhav rathore" <isai.thompson93@ethereal.email>',
    to: email, // Receiver's email address
    subject: 'New Message from Contact Form',
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${number}\nMessage: ${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
