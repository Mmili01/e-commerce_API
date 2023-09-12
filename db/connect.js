const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.set("strictQuery", false); // Set strictQuery to false
 
  return mongoose.connect(url);
};

module.exports = connectDB;
