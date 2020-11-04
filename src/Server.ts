import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";

import express from "express";

import ApiMiddleware from "./middleware/ApiMiddleware";
import ErrorMiddleware from "./middleware/ErrorMiddleware";
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.get("/favicon.ico", (req, res) => res.status(204).end());
app.use("/api", ApiMiddleware.validateToken, ApiMiddleware.getLandApiProxy);
app.use(routes);
app.use(ErrorMiddleware.getErrorMiddleware);

export default app;
