const Joi = require("@hapi/joi");

const registerValidation = (data)=>{
    const registerSchema = {
        user_name : Joi.string().required(),
        user_sec : Joi.string().required(),
        user_email : Joi.string().required(),
        user_pass : Joi.string().min(6).required()
    };
    return Joi.validate(data,registerSchema);
}
const loginValidation = (data)=>{
    const loginSchema = {
        user_email : Joi.string().required(),
        user_pass : Joi.string().min(6).required()
    };
    return Joi.validate(data,loginSchema);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;