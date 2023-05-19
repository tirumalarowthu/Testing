const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const cors = require("cors")
const connectDB = require("./config/db")
const adminRoutes = require("./routes/adminRoutes")
const applicantRoutes = require("./routes/applicantRoutes")
const Applicant = require("./models/applicant")
const sendMails = require("./controllers/sendMails")
const path = require("path")
app.use(express.json())

app.use(cors())
app.get("/api/applicants", async (req, res) => {
    const results = req.query.results || 10
    const start = req.query.start || 0
    const users = await Applicant.find({})
        .skip(parseInt(start))
        .limit(parseInt(results))
    if (users.length > 0) {
        res.json(users)
    } else {
        res.send("Applicants not found..please refresh page")
    }
})
app.get("/api", async (req, res) => {
    const users = await Applicant.find({})
    const searchTerm = req.query.search
    if (!searchTerm) {
        res.send(users)
    } else {
        const searchResults = await users.filter((item) => {
            return item.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        if (searchResults.length > 0) {
            res.send(searchResults)
        } else {
            res.send("Search Results are empty")
        }

    }

})

// app.get("/", (req, res) => {
//     res.send("Hi,Your Server Running Successfully.")
// })

app.use("/", adminRoutes)
app.use("/", applicantRoutes)
app.use("/", sendMails)
//Frontend Integration
const _dirname = path.dirname("")
const builPath = path.join(_dirname, "../client/build");
// app.use(express.static(builPath))
app.use(express.static(path.join(builPath)));
app.get("/*", function (req, res) {
    res.sendFile('index.html',
        { root: path.join(_dirname, "../client/build") },
        function (err) {
            if (err) {
                res.status(500).send(err)
            }
        }
    );
})



connectDB()

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Running at Port ${process.env.PORT}`)
}) 