import { Request, Response } from "express";
import jwt from "jsonwebtoken";

class TokenController {
  getTokenRoute = (req: Request, res: Response) => {
    const id = "REALESTATE";
    const token = jwt.sign(
      {
        id,
      },
      process.env.TOKEN as string,
      {
        expiresIn: "2m",
      }
    );

    res.send({
      token,
    });
  };
}

export default new TokenController();
