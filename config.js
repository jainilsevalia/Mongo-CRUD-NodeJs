const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://jainilsev25:OpSfiiYjaHQPQTTp@cluster0.j7trhn4.mongodb.net/test";

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database Connection sucessful !!");
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

const User = mongoose.model("User", userSchema);

module.exports = { User };
