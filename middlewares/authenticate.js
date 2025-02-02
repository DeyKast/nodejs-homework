import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/userModel.js";
import { HttpError, ctrlWrapper } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch {
    throw HttpError(401, "Not authorized");
  }
};

export default ctrlWrapper(authenticate);
