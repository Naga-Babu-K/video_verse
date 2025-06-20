const express = require("express");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const fs = require("fs");
const mysql = require("./db"); // Import database connection

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs"); // ✅ Set EJS as the template engine
app.use(express.static(path.join(__dirname, "../public"))); // ✅ Serve static files



// ✅ Serve the homepage (index.ejs)
app.get("/", (req, res) => {
    res.render("index");
});



const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
