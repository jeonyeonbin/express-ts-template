import { Request, Response, NextFunction, RequestHandler } from "express";
import { OK } from "http-status-codes";
import logger from "@shared/Logger";

class ErrorMiddleware {
  getErrorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.err(err, true);
    res.status(OK).json({
      error: err.message,
    });
  };
}

export default new ErrorMiddleware();
