const { Schema, model, mongoose } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../helpers/handleMongooseError");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true,
      required: [true, "the 'name' fileds is required"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "the 'email' filed is required"],
    },
    phone: {
      type: String,
      minLength: 3,
      maxLength: 16,
      trim: true,
      required: [true, "The 'phone' field is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

contactSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.contacts.countDocuments({ email });
  return !emailCount;
}, "Email already exist");

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),

  email: Joi.string().required().messages({
    "any.required": `Missing required email field`,
  }),

  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),

  favorite: Joi.boolean().optional(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": `Missing field favorite` }),
});

const Contact = model("contacts", contactSchema);

module.exports = {
  Contact,
  updateFavoriteSchema,
  addSchema,
};
