let mongoose = require('mongoose');
require('dotenv').config()

//Set up mongoose connection
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_SECRET = process.env.DB_SECRET

function connectMongoDB() {
    let mongoDB = `mongodb+srv://${DB_USER}:${DB_SECRET}@edmcalendardata.8zmby.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true})
    .then((result) => {
    console.log('MongoDB Connection Successful!')
    })
    .catch(error => console.log('MongoDB connection was NOT Successful :( ', error));
}

module.exports = { connectMongoDB }