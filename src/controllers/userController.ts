import { Request, RequestHandler, Response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/user.model";
import { generateToken } from "../config/generateToken";

const register: RequestHandler = async (req: Request, res: Response) => {
  const { firstname, lastname, email, username, password, avatar } = req.body;

  if (!firstname || !lastname || !email || !username || !password) {
    res.status(400)
    throw new Error("Please Enter all the fields");
  }

  const userExist = await User.findOne({ $or: [{ email }, { username }] });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    firstname,
    lastname,
    email,
    username,
    password: hashedPassword,
    avatar,
  });
  if (user) {
    res.status(201);
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      avatar: user.avatar,
      token:generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
};

const login: RequestHandler = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if ((!email || !username) && !password) {
    throw new Error("Invalid credentials");
  }
  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (matchPassword) {
    res.status(200);
    res.json({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      username: user.username,
      token:generateToken(user._id)
    });
  }
};

export { register, login };
