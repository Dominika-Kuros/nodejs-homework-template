const mongoose = require("mongoose");

const app = require("./app");
const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uriDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
};

connectToDatabase();
