import jwt from "jsonwebtoken";

const sessionIdToUserMap = new Map();
const secret = "Manish@123";

export function setUser(user) {
  return jwt.sign({ _id: user._id, email: user.email }, secret);
  // sessionIdToUserMap.set(id, user);
}

export function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
  // return sessionIdToUserMap.get(id);
}
