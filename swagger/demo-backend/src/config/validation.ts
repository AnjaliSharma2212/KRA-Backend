import Joi from "joi"

export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  DATABASE_URL: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  ALLOWED_ORIGINS: Joi.string().required(),
})