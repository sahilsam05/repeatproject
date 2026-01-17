require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: process.env.LOCAL_HOST, credentials: true }));

mongoose.connect(`mongodb://localhost/${process.env.DB_NAME}`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
    console.log("Connected to MongoDB:", db.client.s.url);
});

// Derek-style mounting (router defines /products path)
app.use(require("./routes/products"));

app.use(require(`./routes/users`));


app.listen(process.env.SERVER_PORT, function () {
    console.log("Server running on port", process.env.SERVER_PORT);
});
