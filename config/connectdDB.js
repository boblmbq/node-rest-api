const { connect } = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const db = await connect(process.env.CONNECTION);
    console.log(
      `
      Database connection successful
      Name: ${db.connection.name}.
      Port ${db.connection.port}
      Host: ${db.connection.host}. 
      `.blue.italic
    );
  } catch (error) {
    console.log(error.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;
