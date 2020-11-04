import { Router } from "express";
import TokenRouter from "./Token";

// Init router and path
const router = Router();

// Add sub-routes
router.use("/token", TokenRouter);

// Export the base-router
export default router;
