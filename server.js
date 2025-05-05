
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();


const PORT = process.env.PORT || 5000;


const app = express();

//===================== hosted on render =========================
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


//============================ localhost ===========================
// app.use(cors({
//   origin: "http://localhost:5173", 
// }));
// app.use(express.json());



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
