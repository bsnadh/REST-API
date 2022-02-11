const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const app = express();
app.use(express.json());
//import routes
const postsRoutes = require('./routes/posts');
app.use('/posts', postsRoutes);

app.get('/',(req, res) => {
    res.send("Home page!")
})


mongoose.connect(
    process.env.DB_CONNECTION, (error) => {
        if(error) {
            console.log(error)
        } else {
            console.log("connected to DB...")
        }
})
app.listen(3000);