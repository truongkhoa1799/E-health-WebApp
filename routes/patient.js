var express = require('express');
const { on } = require('../app');
var router = express.Router();

let patient_controller = require('../controllers/PatientController');

//Uploading multiple files
router.post('/add_patient', patient_controller.create_patient);
// stotage.upload, (req, res, next) => {
//     const list_images = req.files;
//     const infor = req.body;

//     // res.send(add_patient(infor, list_images));

//     // if (!list_images || check_valid_information(infor) == -1) {
//     //     const error = new Error('Has Error when add new patient');
//     //     error.httpStatusCode = 400;
//     //     return next(error);
//     // }
//     // var ret = add_patient(infor, list_images);
//     res.render('success', { message: 'File uploaded to Azure Blob storage.' });
// })



router.get('/add_patient', function(req, res, next) {
    res.render('add_patient', { title: 'Express' });
});



module.exports = router;