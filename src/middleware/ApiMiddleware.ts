import httpProxy from "http-proxy";
import { Request, Response, NextFunction } from "express";

class ApiMiddleware {
  private landApiProxy: httpProxy;
  private SECOND: number = 1000;
  constructor() {
    this.landApiProxy = this.createProxyServer();
  }

  private createProxyServer = () => {
    return httpProxy.createProxyServer({
      target: "http://test-sapi.space.naver.com",
      xfwd: true,
      proxyTimeout: 2 * this.SECOND,
      timeout: 2 * this.SECOND,
    });
  };

  public getApiProxy = (req: Request, res: Response, next: NextFunction) => {
    this.landApiProxy.web(req, res, {
      changeOrigin: true,
    });
  };
}

export default new ApiMiddleware();
