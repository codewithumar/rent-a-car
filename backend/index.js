require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Import Routes
const loginAndSignupRoute = require("./routes/userLogin&Signup");
const postRoute = require("./routes/post");
const categoryRoute = require("./routes/category");
const getUserAds = require("./routes/getUserAds");
const deleteAd = require("./routes/deleteAd");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
dbConenct = async () =>{
await mongoose.connect(`${process.env.CONNECTION_URL}`, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    const db = mongoose.connection;
    // Your database operations here
  })
  .catch((error) => console.log(error.message));
}
const port = process.env.PORT || 3001;
app.listen(port, () => {
  dbConenct();
  console.log(`Server is running on port: ${port}`);
});



mongoose.set("useCreateIndex", true);

app.use("/login", loginAndSignupRoute);

app.use("/post", postRoute);

app.use("/categories", categoryRoute);

app.use("/userAds", getUserAds);

app.use("/deleteAd", deleteAd);

app.get("/", (req, res) => {
  res.send("<h1>Home</h1>");
});
