const app = require("./app");
const path = require("path");
const connectDB = require("./config/connectDB");
const configPath = path.join(__dirname, ".", "config", ".env");
require("dotenv").config({ path: configPath });

connectDB()
const { PORT } = process.env;


app.listen(PORT, () => {
  console.log(`Server runs on port: ${PORT}`.blue.italic);
});
