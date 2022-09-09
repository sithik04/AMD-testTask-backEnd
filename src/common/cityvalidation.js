import Joi from "joi";

export const cityValidation = Joi.object({
    city: Joi.string().required()
})

