import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/create", async (req, res) => {
  const user = await User.create({
    name: "Joy",
    email: "joy@test.com",
  });

  res.json(user);
});

export default router;
