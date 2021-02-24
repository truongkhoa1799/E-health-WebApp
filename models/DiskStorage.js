const multer = require('multer');
const util = require("util");
const { v1: uuid} = require('uuid');

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images_patient')
    },
    filename: function (req, file, cb) {
        cb(null, uuid() + ".jpeg");
    }
})

let upload = multer({ storage: storage }).array('myImages', 12)
let upload_files = util.promisify(upload);
module.exports = upload_files; 