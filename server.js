const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const multer = require('multer')
const DB = require('./database/databse.js')
DB()
const { GridFsStorage } = require('multer-gridfs-storage')



app.set('view engine', 'ejs');


const storage = new GridFsStorage({
    // DATABASE URL
    url: MONGO_URI,
    // FILE STORAGE IN MONGODB
    file: (req, file) => {
        return {
            filename: Date.now() + '-' + file.originalname,
        }
    }
});

const upload = multer({ storage });


app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        message: 'File stored in mongodb',
        file: req.file
    })
})

// FILE UPLOAD TO LOCAL STORAGE
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });

// const upload = multer({ storage: storage })


// FILE UPLOAD AND STORAGE IN MONGODB







app.get('/upload', (req, res) => {
    res.render('upload')
})






app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})