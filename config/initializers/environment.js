const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

/**
 * Read .env file
 */
const projectDir = path.join(__dirname, "../..");
let dotenvFile = path.join(projectDir, `.env.${process.env.NODE_ENV || "development"}`);
if (!fs.existsSync(dotenvFile)) dotenvFile = path.join(projectDir, ".env");
dotenv.config({ path: dotenvFile });
