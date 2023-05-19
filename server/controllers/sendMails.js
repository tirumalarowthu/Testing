const nodemailer = require("nodemailer")
const express = require("express")
const sendMails = express.Router()
const Admin = require("../models/admin")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tirumalarowthuv@gmail.com",
        pass: "dthqdtvsagsiuivp"
    }
})


sendMails.post("/add/send/:text", async (req, res) => {
    const { text } = req.params
    const mailOptions = {
        from: "tirumalarowthuv@gmail.com",
        to: ['Technicalmanagerp2f@gmail.com', 'Hiringmanagerp2f@gmail.com', 'hrpfsemi5@gmail.com', 'akshata8178@gmail.com'],
        subject: `New applicant ${text} added(Applicant-Tracking-System).`,
        text: `Hello there! I hope this email finds you well. I have some exciting news to share: ${text} our new applicant, has been successfully added.`
    }
    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send("Email sent successfully" + info.response)
        }
    })
})

sendMails.post("/change/:changeby/:name/:text", async (req, res) => {
    const { name, text, changeby } = req.params
    const data = await Admin.findOne({ name: name })
    if (data) {
        const mailOptions = {
            from: "tirumalarowthuv@gmail.com",
            to: data.email,
            subject: `Applicant ${text} status changed.`,
            text:`hi,I am writing this mail to inform you that the status of ${text} has been changed by ${changeby} and also assigned you as the new owner of ${text}.So please reach out.`
        }
        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                res.send(err.message)
            } else {
                res.send("Email sent successfully " + info.response)
            }
        })
    } else {
        res.status(404).send("Email not found")
    }

})
module.exports = sendMails