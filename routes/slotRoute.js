import express from "express";
import Slot from "../controllers/SlotController.js";
const router = express.Router();

// middleware that is specific to this router
router.get("/", Slot.getAll);
router.post("/", Slot.postAdd);
router.put("/", Slot.putUpdate);
router.delete("/", Slot.deleteById);
export default router;
