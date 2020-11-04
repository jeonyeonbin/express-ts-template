import httpProxy from "http-proxy";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import logger from "@shared/Logger";
import {
  INSUFFICIENT_SPACE_ON_RESOURCE,
  UNAUTHORIZED,
} from "http-status-codes";

class ApiMiddleware {
  private landApiProxy: httpProxy;
  private SECOND: number;
  constructor() {
    this.landApiProxy = this.createProxyServer();
    this.SECOND = 1000;
  }

  private createProxyServer = () => {
    return httpProxy.createProxyServer({
      target: "http://test-sapi.space.naver.com",
      xfwd: true,
      proxyTimeout: 4 * this.SECOND,
      timeout: 4 * this.SECOND,
    });
  };

  public getLandApiProxy = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.landApiProxy.web(req, res, {
      changeOrigin: true,
    });
  };

  public validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      jwt.verify(
        (req.cookies.authorization as string)?.split("Bearer ")[1],
        process.env.TOKEN as string
      );
      next();
      return;
    } catch (err) {
      logger.err(err);
      if (err.name === "TokenExpiredError") {
        return res.status(INSUFFICIENT_SPACE_ON_RESOURCE).send({
          error: "token만료",
        });
      }
      return res.status(UNAUTHORIZED).send({
        error: "error Token",
      });
    }
  };
}

export default new ApiMiddleware();
