import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JOB-SEEKING-WEBSITE",
    })
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((error) => {
      console.log(`Server cought some database error ${error}`);
    });
};
