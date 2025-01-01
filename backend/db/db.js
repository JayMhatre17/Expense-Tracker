import mongoose from "mongoose";

export const connect = () => {
  const conn = mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connected to db");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
