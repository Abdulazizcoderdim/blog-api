/**
 * @copyright 2025 Abdulazizcoderdim
 * @license MIT
 */
import config from "@/config";
import v1Routes from "@/routes/v1";
import compression from "compression";
import cookieParser from "cookie-parser";
import type { CorsOptions } from "cors";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import limiter from "./lib/express_rate_limit";
import { connectToDatabase, disconnectFromDatabase } from "./lib/mongoose";

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
    await connectToDatabase();

    app.use("/api/v1", v1Routes);

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

const handleServerShutdown = async () => {
  try {
    await disconnectFromDatabase();

    console.log("Server SHUTDOWN");
    process.exit(0);
  } catch (error) {
    console.log("Error during server shutdown", error);
  }
};

process.on("SIGTERM", handleServerShutdown);
process.on("SIGINT", handleServerShutdown);
