var Joi = require('joi');
var stotage = require('../models/DiskStorage');

var check_valid_information = function(infor){
    let user_infor_chema ={
        first_name: Joi.string().min(2).max(7).required(),
        last_name: Joi.string().min(2).max(35).required(),
        birth_date: Joi.string().min(10).max(10).required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
    
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.ref('password'),
    
        access_token: [
            Joi.string(),
            Joi.number()
        ],
    
        birth_year: Joi.number()
            .integer()
            .min(1900)
            .max(2013),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    }
};

let create_patient = async (req, res) => {
    try {
        // Save images in local
        await stotage.upload(req, res);

        

    } catch (error) {
        console.log(error);
    }
    res.send('NOT IMPLEMENTED: Book update GET');
}

var add_patient = function (infor, list_images){
    for(let i = 0; i< list_images.length; i++){
        console.log(list_images[i].path);
    }
}

module.exports = {
    create_patient: create_patient
};
