import express from "express";
import User from "../controllers/UserController.js";
const router = express.Router();

// middleware that is specific to this router
router.get("/", User.getAll);
router.post("/", User.postAdd);
router.put("/", User.putUpdate);
router.delete("/", User.deleteById);
export default router;
