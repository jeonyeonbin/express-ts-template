import { Router } from "express";
import TokenController from "@controller/Token.controller.ts";

const router = Router();
router.get("/", TokenController.getTokenRoute);

export default router;
