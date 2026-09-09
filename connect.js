import mongoose from "mongoose";
mongoose.set("strictQuery", true);
export async function connectMongoDb(url) {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDb Connected"))
    .catch((err) => console.log("Mongo Error", err));
}
