const multer = require('multer');

//Mime type dictionnary
const MIME_TYPE = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png"
}

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        //Remove the spaces from the original file and replace them with _
        const name = file.originalname.split(' ').join('_');
        //browsers use the MIME type to determine how they will process or display the document
        const extension = MIME_TYPE[file.mimetype];
        //Using Date.now() and extension makes the filename unique
        callback(null, name + Date.now() + '.' + extension)
    }
})

//Export storage function and define how many file can be send
module.exports = multer({storage}).single("image");