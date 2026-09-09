import express from "express";
import path from "path";
import { connectMongoDb } from "./connect.js";
import URL from "./models/url.js";
import cookieParser from "cookie-parser";
import { restrictToLoggedInUserOnly, checkAuth } from "./middleware/auth.js";
import router from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/short_url").then(() => {
  console.log("MongoDB Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, router);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.get("/:shortId", router);

app.listen(PORT, () => console.log(`Server Started at Port ${PORT}`));
