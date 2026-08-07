const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

module.exports = { app };
