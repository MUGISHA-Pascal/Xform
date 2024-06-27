const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: String,
  firstName: String,
  lastName: String,
  position: String,
  company: String,
  businessArena: String,
  employees: Number,
  street: String,
  additionalInfo: String,
  zipCode: String,
  place: String,
  country: String,
  phoneNumber: String,
  email: String,
});

module.exports = mongoose.model("User", UserSchema);
