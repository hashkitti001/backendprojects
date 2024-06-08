const express = require("express")
const noteRouter = express.Router()
const multer = require("multer")
const fs = require("fs")
const noteController = require("../controllers/noteController")
// Ensure the uploads directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });
const dummy = () => {
    console.log("e")
}
noteRouter.post("/check-grammar", upload.single('file'), noteController.checkGrammar)
noteRouter.post("/save-note", upload.single('file'), dummy)
noteRouter.post('/mdtohtml/', upload.single('file'), noteController.renderAsHTML)

module.exports = noteRouter
