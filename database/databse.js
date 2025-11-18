const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI

const DB = async() => {
    try {

        await mongoose.connect(MONGO_URI)
        console.log('Mongodb connected...')
    } catch (error) {
        console.log({error})
    }
}

module.exports = DB