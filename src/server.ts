/**
 * @copyright 2025 Abdulazizcoderdim
 * @license MIT
 */
import config from "@/config";
import express from "express";

const app = express();

app.listen(config.PORT, () => {
  console.log(`Server running: http://localhost:${config.PORT}`);
});
