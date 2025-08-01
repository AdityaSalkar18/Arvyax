const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(" Database Connected Successfully");
  } catch (error) {
    console.error(" Database Connection Failed:", error.message);
    process.exit(1); 
  }
};

module.exports = connect;
