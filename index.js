const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index", "Hello world" );
});

app.listen(port, () => {
  console.log("API MONGODB IS LISTENNING IN PORT " + port);
});
