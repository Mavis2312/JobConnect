import mongoose from "mongoose";

// connect to db
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_LOCAL_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.error(`MongoDB ErrorError: ${error.message}`);
    process.exit(1);
  }
}

export default dbConnect;