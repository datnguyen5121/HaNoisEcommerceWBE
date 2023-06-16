import mongoose from "mongoose";
const connect = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connect to db successfully!");
  } catch (error) {
    console.error("Connect to db failed!");
  }
};

export default connect;
