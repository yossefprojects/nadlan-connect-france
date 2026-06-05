import { Router, type IRouter } from "express";
import healthRouter from "./health";
import simulateRouter from "./simulate";
import pdfRouter from "./pdf";
import anthropicRouter from "./anthropic";

const router: IRouter = Router();

router.use(healthRouter);
router.use(simulateRouter);
router.use(pdfRouter);
router.use(anthropicRouter);

export default router;
