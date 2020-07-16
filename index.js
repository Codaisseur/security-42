const express = require("express");
const User = require("./models").user;
const authRouter = require("./routers/auth");
const PORT = 4005;
const app = express();

// body-parser middleware
app.use(express.json());

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log("server started!"));
