const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models").user;

const router = new Router();

router.get("/test", (req, res) => res.send("Reached the router!"));

router.post("/signup", async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    // get some parameters in the body
    // check if i got the info i need.
    if (!email || !name || !password) {
      return res.status(400).send("Bad request missing parameters");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      delete newUser.dataValues["password"];
      res.send(newUser);
    }
    // proceed and create user.

    // send back 200 and the email.
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  console.log("Reached the route!");
  try {
    // get email and password from body
    // check if I got them.
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Missing credentials");
    } else {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).send("User not found");
      } else {
        const passwordsMatch = bcrypt.compareSync(password, user.password);
        console.log("passwords match?", passwordsMatch);

        if (passwordsMatch) {
          res.send("login successfull"); // actually, we have to send back the jwt
        } else {
          res.status(401).send("Unauthorized");
        }
      }
    }

    // find the user.
    // we can find one guy or no one.

    // use bcrypt to compare password from request with stored hashed password.
  } catch (e) {}
});

module.exports = router;
