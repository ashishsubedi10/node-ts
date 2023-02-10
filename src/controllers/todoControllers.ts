import { Request, RequestHandler, Response } from "express";

const Todo: RequestHandler = async (req: Request, res: Response) => {
  const { title, description } = req.body;
};
