import { Router } from "express";
import { getSongs, createSong } from "../controllers/songs.controller.js";

const router = Router();

router.get("/", getSongs);
router.post("/", createSong);

export default router;
