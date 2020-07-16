const { toData } = require("./jwt");
const User = require("../models").user;

const authMiddleware = async (req, res, next) => {
  // header => "Bearer <token>"
  // 1. check headers for auth.
  // 2. Split the header
  const auth =
    req.headers.authorization && req.headers.authorization.split(" "); // => ["Bearer", "token"]
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // 3. check the token
    try {
      const data = toData(auth[1]);
      console.log("token decoded", data);

      const user = await User.findByPk(data.userId);

      req.user = user;
      next();
    } catch (e) {
      console.log("token invalid");
      res.status(401).send("Invalid token");
    }
    // 4. see if we got the data back
  } else {
    res.status(400).send("missing auth header or malformed");
  }
};

module.exports = authMiddleware;
