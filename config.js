const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectionString = process.env.MONGO_URI;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database Connection successful !!");
  })
  .catch((error) => {
    console.log(error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  firstName: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", userSchema);
