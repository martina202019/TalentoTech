const bcrypt = require("bcrypt");
const userSchema = require("../models/User");
const jwt = require("jsonwebtoken");

class UserController {
  constructor() {}

  async login(email, password) {
    try {
      const user = await userSchema.findOne({ email });
      if (!user) {
        return { status: "error", message: "User not found" };
      }

      //Comparar la contraseña que ingresa el usuario, con la hasheada
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return { status: "error", message: "Invalid password" };
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        "secreto",
        { expiresIn: "1h" }
      );

      return { status: "success", token: token };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Failed to login" };
    }
  }

  validateToken(req, res, next) {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) {
      return res
        .status(401)
        .json({ status: "error", message: "Token does not exist" });
    }

    const token = bearerToken.startsWith("Bearer ")
      ? bearerToken.slice(7)
      : bearerToken;
      console.log(token);
    jwt.verify(token, "secreto", (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });
      }
      req.userId = decoded.userId;
      next();
    });
  }
}
module.exports = UserController;
