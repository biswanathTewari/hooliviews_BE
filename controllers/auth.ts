import _ from "lodash";
import { Request, Response } from "express";
import { User, validateUser } from "../models";

export const signUpUser = async (req: Request, res: Response) => {
  try {
    //~ Validate the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //~ Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists.");

    //~ Create a new user
    const newUser = new User(_.pick(req.body, ["email", "password"]));
    newUser.password = newUser.generateHash();

    //~ Save the new user
    await newUser.save();

    //~ Send response
    const encodedToken = newUser.generateToken();
    const data = {
      user: _.pick(newUser, ["_id", "email"]),
      encodedToken,
    };
    return res.status(201).send({ data });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const logInUser = async (req: Request, res: Response) => {
  try {
    //~ Validate the request body
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //~ Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password.");

    //~ Check if password is correct
    const validPassword = user.validatePassword(req.body.password);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    //~ Send response
    const encodedToken = user.generateToken();
    const data = {
      user: _.pick(user, ["_id", "email"]),
      encodedToken,
    };
    return res.status(200).send({ data });
  } catch (err) {
    res.status(500).send(err);
  }
};
