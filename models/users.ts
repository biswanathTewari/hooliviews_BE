import { Schema, Model, model } from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";

//& interfaces
interface IUser {
  email: string;
  password: string;
}

interface IUserMethods {
  generateHash: () => string;
  validatePassword: (password: string) => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

//& Schema
const userSchema = new Schema<IUser, UserModel, IUserMethods>({
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
    required: true,
  },
});

//& Hashing
userSchema.methods.generateHash = function (): string {
  return bcrypt.hashSync(this.password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password); // req.body.password, hashed password
};

//& Model
const User = model<IUser, UserModel>("hooliusers", userSchema);

//& Validation
const validateUser = (user: typeof User): any => {
  const schema = Joi.object({
    email: Joi.string().email().min(3).max(25).required(),
    password: Joi.string().min(3).max(25).required(),
  });
  return schema.validate(user);
};

export { User, validateUser };
