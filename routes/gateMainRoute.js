import express from "express";
import Main from "../controllers/GateDimController.js";
const router = express.Router();

// middleware that is specific to this router
router.get("/", Main.getAll);
router.post("/", Main.postAdd);
router.put("/", Main.putUpdate);
router.delete("/", Main.deleteById);
export default router;
