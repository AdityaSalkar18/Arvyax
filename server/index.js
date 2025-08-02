require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const connect = require("./db");

const userRoutes = require("./routes/user");
const sessionRoutes = require("./routes/session");

const cloudinary = require('cloudinary').v2;


connect();

cloudinary.config({
    
    cloud_name:  process.env.CN,
    api_key: process.env.AK,
    api_secret: process.env.AS
});

app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoutes); 
app.use("/api/session", sessionRoutes);

app.listen(8080, () => console.log("Server started on port 8080"));
