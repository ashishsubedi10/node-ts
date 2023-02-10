import express, { Express, IRouter, Request, Response } from "express";
import { login, register } from "../controllers/userController";
import { protect } from "../middlewares/authMiddleware";

const router: IRouter = express.Router();

router.route("/todo").post(protect, (req: Request, res: Response) => {
  res.json("hello world");
});
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
