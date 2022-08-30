import _ from "lodash";
import { User, validateUser } from "../models";

export const signUpUser = async (req: any, res: any) => {
  try {
    //~ Validate the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //~ Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists.");

    //~ Create a new user
    const newUser = new User(_.pick(req.body, ["email", "password"]));

    //~ Save the new user
    await newUser.save();
    return res.status(201).send(_.pick(newUser, ["_id", "email"]));
  } catch (err) {
    res.status(500).send(err);
  }
};
