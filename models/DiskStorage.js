const multer = require('multer');
const util = require("util");

// SET STORAGE
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images_patient')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + ".jpeg");
    }
})

let upload = multer({ storage: storage }).array('myImages', 12)

module.exports.upload = util.promisify(upload);