import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

interface JwtId {
  id: string;
}
const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //token id decode
      const { id } = jwt.verify(
        token,
        `${process.env.JWT_SECRET}`
      ) as JwtId;

      req.body.user = await User.findById(id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export { protect };
