
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();


const PORT = process.env.PORT || 5000;


const app = express();
app.use(cors({ origin: "https://port-folio-1-five.vercel.app/", credentials: true }));
app.use(express.json());

console.log('server runnnnnnning');

app.post("/contact", (req, res) => {
  console.log("Received contact form submission:", req.body);
  const { firstName, lastName, email, message, phone } = req.body;

  const name = firstName + " " + lastName;

  const mail = {
    from: name,
    to: process.env.EMAIL_TO,
    subject: "Contact Form Submission",
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };


    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    transporter.sendMail(mail, (error) => {
      if (error) {
        res.status(500).json({ status: "ERROR", error });
      } else {
        res.status(200).json({ status: "Message Sent" });
      }
    });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
