import dbConnection from "./connection/dbConnection.js";
import config from "./config/index.js";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Chat GPT Clone Server!" });
});

app.listen(config.port, () => {
  console.log(`📢 Server running :- http://localhost:${config.port}`)
  dbConnection();
});