const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const pdfRoute = require("./routes/pdfmake");
app.use("/pdfMake", pdfRoute);

app.listen(3000, () => {
  console.log("Server started");
});
