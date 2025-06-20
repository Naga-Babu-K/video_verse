const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.post("/send", async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Configure Nodemailer
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // Admin email
                pass: process.env.PASSWORD, // Admin email password
            },
        });

        // Email options
        let mailOptions = {
            from: email,
            to: process.env.EMAIL, // Admin email
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        };

        // Send email
        await transporter.sendMail(mailOptions);
        res.render("success");
    } catch (error) {
        console.error(error);
        res.send("Error sending email.");
    }
});

module.exports = router;
