import dbConnection from "./connection/dbConnection.js";
import imagekit from "./lib/imagekit.js";
import config from "./config/index.js";
import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors({
  origin: config.clientUrl,
  credentials: true // Required for cookies/auth
}));

app.get("/", (req, res) => {
  res.json({ message: "Hello from Chat GPT Clone Server!" });
});


app.get("/api/upload", (req, res) => {

  const { token, expire, signature } = imagekit.getAuthenticationParameters();
  res.send({ token, expire, signature, publicKey: config.imgPubKey });

});



app.listen(config.port, () => {
  console.log(`📢 Server running :- http://localhost:${config.port}`)
  dbConnection();
});