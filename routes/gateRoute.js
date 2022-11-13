import express from "express";
import Gate from "../controllers/GateController.js";
const router = express.Router();

// middleware that is specific to this router
router.get("/", Gate.getAll);
router.post("/", Gate.postAdd);
router.put("/", Gate.putUpdate);
router.delete("/", Gate.deleteById);
export default router;
