const app = require("./app")
const {join} = require("path")
const connectDb = require("./config/connectdDB")
const configPath = join(__dirname, ".", "config", ".env")
require("dotenv").config({ path: configPath })

connectDb()

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue.italic);
})