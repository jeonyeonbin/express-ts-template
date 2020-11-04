import StatusCodes from "http-status-codes";
import { Request, Response, Router } from "express";


const router = Router();
const { OK } = StatusCodes;

router.get("/all", async (req: Request, res: Response) => {
  return res.status(OK).json({ 1: '2' });
});

export default router;
