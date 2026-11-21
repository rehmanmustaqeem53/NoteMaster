import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { dbConnection } from "./config/db.js";

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await dbConnection();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
  }
};

startServer();
