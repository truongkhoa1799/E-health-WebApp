var Joi = require('joi');
var stotage = require('../models/DiskStorage');
var DB = require('../models/DB')

var validate_information = (infor, images_file) => {
    let gender = (infor.gender_male == "on")? 'm':((infor.gender_female == "on")? 'f': undefined);
    if (gender == undefined) return {ret:-1, message:"Invalid gender"};

    let list_file_name = [];
    images_file.forEach(element => {
        list_file_name.push(element.filename);
    });

    if (list_file_name.length != 5)
        return {user_infor: -1, 
                list_images:-1, 
                message:"There must have 5 images"
        }

    let user_infor_chema = Joi.object({
        first_name: Joi.string().min(2).max(7).required(),
        last_name: Joi.string().min(2).max(40).required(),
        birth_date: Joi.string().min(10).max(10).required(),
        gender_female: Joi.string(),
        gender_male: Joi.string(),
        address: Joi.string().min(1).max(100).required(),
        phone_number: Joi.string().pattern(new RegExp('^[0][0-9]{9}$|^[0][0-9]{10}$')),
        ssn: Joi.string().pattern(new RegExp('^[0-9]{9}$|^[0-9]{12}$')),
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        repeat_password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    });

    let {error} = user_infor_chema.validate(infor);
    if (!error){
        return{
            user_infor:{'type_request':"2",
                        'device_ID': "2",
                        'first_name' : infor.first_name,
                        'last_name' : infor.last_name,
                        'date_of_birth' : infor.birth_date,
                        'gender' : gender,
                        'address' : infor.address,
                        'phone_number' : infor.phone_number,
                        'ssn' : infor.ssn,
                        'user_name' : infor.username,
                        'password' : infor.password,
                        'repeat_password' : infor.repeat_password,
                        'e_meail' : infor.email
            },
            list_images:list_file_name,
            message: "0"
        }
    }
    else{
        return {user_infor: -1, list_images:-1, message: error.details[0].message};
    }
};


let create_patient = async (req, res) => {
    try {
        // Save images in local
        await stotage(req, res);
        let ret = await validate_information(req.body, req.files);
        if (ret.user_infor == -1){
            console.log(ret.message);
            res.send(ret.message);
            return;
        }
        DB.create_patient(ret.user_infor, ret.list_images);
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
