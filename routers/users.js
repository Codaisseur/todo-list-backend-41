const User = require("../models").user;
const { Router } = require("express");
const { validateId } = require("../middlewares/validators");

const router = new Router();

// get /users
router.get(`/`, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

// post /users
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      res.status(400).send("Missing parameters");
    } else {
      const newUser = await User.create({ email, password, name });
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});

router.get("/:id", validateId, async (req, res, next) => {
  const id = parseInt(req.params.id);

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      console.log(`User requested at ${new Date()}`);
      res.send(user); // this is the end
      // next()
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", validateId, async (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send({ message: "Id is not a not number" });
  }

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send("user not found");
    } else {
      await user.destroy();
      res.send(`Deleted user ${user.email}`);
    }
  } catch (e) {}
});

module.exports = router;
