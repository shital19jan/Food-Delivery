import Joi from "joi";

const menuItemValidatorSchema = Joi.object({
    name: Joi.string().min(3).max(40).required().trim().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "string.max": "Name cannot exceed 40 characters",
        "any.required": "Name field is required"

    }),
    description: Joi.string().min(10).max(100),
    rating: Joi.number().min(0).max(5),
    price: Joi.number().min(1).max(100000),
    imgURL: Joi.string(),
    isCustomisable: Joi.boolean(),
    isAvailable: Joi.boolean(),
    isVeg: Joi.boolean(),
    calories: Joi.number().min(0).max(1000),
    menuCategoryId: Joi.string()

});

export default menuItemValidatorSchema;