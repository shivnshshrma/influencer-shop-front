import Joi from 'joi';

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({
        error: 'Validation failed',
        details: errorMessage,
        code: 'VALIDATION_ERROR'
      });
    }
    
    next();
  };
};

// Common validation schemas
export const schemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^\d{10}$/).optional(),
    gender: Joi.string().valid('male', 'female').required()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(2).max(100).optional(),
    phone: Joi.string().pattern(/^\d{10}$/).optional(),
    gender: Joi.string().valid('male', 'female').optional(),
    body_type: Joi.string().optional(),
    style_preference: Joi.string().optional(),
    color_season: Joi.string().optional(),
    notes: Joi.string().max(500).optional()
  }),

  updateMeasurements: Joi.object({
    height: Joi.number().min(100).max(250).optional(),
    chest: Joi.number().min(50).max(200).optional(),
    waist: Joi.number().min(40).max(200).optional(),
    hips: Joi.number().min(50).max(200).optional(),
    shoe_size: Joi.string().max(10).optional(),
    skin_tone: Joi.string().valid('fair', 'light', 'medium', 'olive', 'tan', 'deep', 'dark').optional()
  }),

  createPost: Joi.object({
    name: Joi.string().min(1).max(200).required(),
    description: Joi.string().min(1).max(1000).required(),
    price: Joi.string().required(),
    product_link: Joi.string().uri().required(),
    media_urls: Joi.array().items(Joi.string().uri()).min(1).required(),
    type: Joi.string().valid('image', 'video').required()
  }),

  addToWishlist: Joi.object({
    post_id: Joi.number().integer().positive().required()
  })
};