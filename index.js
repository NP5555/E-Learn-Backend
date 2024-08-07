const express = require("express")
const app = express()
const mongoose = require("mongoose");
require("dotenv").config()
const authRouter = require("./routes/useRouter")

const port = process.env.port

app.use(express.json())
app.use("/", authRouter)





mongoose.connect(
    "mongodb://localhost:27017/Auth"
  )
  .then(() => {
    console.log("Connected To MongoDB"),
      app.listen(port, () => {
        console.log("Server running on localhost:" + port);
      });
  })
  .catch((err) => console.log(`unable to connet with dB : ${err} `));