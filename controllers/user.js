import User from "../models/user.js";
import { v4 as uuidV4 } from "uuid";
import { setUser } from "../service/auth.js";

export const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
};

export const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password,
  });

  if (!user)
    return res.render("login", { error: "Invalid username or password" });

  // const sessionId = uuidV4();
  // setUser(sessionId, user);
  // res.cookie("uid", sessionId);
  const token = setUser(user);
  res.cookie("uid", token);

  return res.redirect("/");
};
