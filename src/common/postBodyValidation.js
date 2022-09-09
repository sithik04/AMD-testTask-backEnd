import Joi from "joi";

//Validators for the sendSMS API
export const postBodyValidation = Joi.object({
    city: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    temperature: Joi.number().required(),
})