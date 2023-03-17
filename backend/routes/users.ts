import express from "express";
import User from "../models/User";
import {Error} from "mongoose";

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
    });

    user.generateToken();
    await user.save();
    return res.send({message: 'Registered successfully !', user});
  } catch (e) {
    if (e instanceof Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default usersRouter;