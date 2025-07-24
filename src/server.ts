/**
 * @copyright 2025 Abdulazizcoderdim
 * @license MIT
 */
import config from "@/config";
import compression from "compression";
import cookieParser from "cookie-parser";
import type { CorsOptions } from "cors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import limiter from "./lib/express_rate_limit";

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      callback(
        new Error(`CORS error: ${origin} is not allowed by CORS`),
        false
      );
      console.log(`CORS error: ${origin} is not allowed by CORS`);
    }
  },
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  compression({
    threshold: 1024,
  })
);
app.use(helmet());
app.use(limiter);

(async () => {
  try {
    app.get("/", (req, res) => {
      res.json({
        message: "hello world",
      });
    });

    app.listen(config.PORT, () => {
      console.log(`Server running: http://localhost:${config.PORT}`);
    });
  } catch (error) {
    console.log("Failed to start the server", error);

    if (config.NODE_ENV === "production") {
      process.exit(1);
    }
  }
})();
