const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
async function createUser(username) {
  let user = new User({
    username,
  });
  try {
    const result = await user.save();
  } catch (ex) {
    for (field in ex.errors) console.log(ex.errors[field]);
  }
}
//createUser("Seham");

module.exports = User;
