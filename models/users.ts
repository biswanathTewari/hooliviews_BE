import mongoose from "mongoose";
import Joi from "joi";

//& Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    minlength: 3,
    maxlength: 25,
    match: /^\S+@\S+\.\S+$/,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 25,
    match: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    required: true,
  },
});

//& Model
const User = mongoose.model("hooliusers", userSchema);

//& Validation
const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required(),
  });
  return schema.validate(user);
};

export { User, validateUser };
