const express = require("express");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

const app = express();
const router = require("./routes/router");

dotenv.config();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/User', router)

// mongodb connect 

const DbConnect = async () => {
    try {
        const Link = process.env.Mongoose_Link;
        await mongoose.connect(Link)
        console.log("mongoose connect success")
    } catch (error) {
        console.log(error)
    }
}
DbConnect();




let Port = process.env._PORT || 3030
app.listen(Port, (req, res) => {
    console.log(`server run on Port no = ${Port}`)
});
