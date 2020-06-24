const express = require("express");
const { response } = require("express");
const User = require("./models").user;
const PORT = 4000;
const app = express();
const morgan = require("morgan");

// Body parser middleware (helps us parse the body of the requests on POST, UPDATE requests)
app.use(express.json());
app.use(morgan("dev"));

function chaosMonkeyMiddleWare(req, res, next) {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) {
    res
      .status(500)
      .send({ message: "You have been visited by the chaosmonkey" });
  }

  next();
}

// use a middleware for all routes with: app.use()
app.use(chaosMonkeyMiddleWare);

app.get(`/hello`, (request, response, next) => {
  response.send("hi from the server! hey");
});

app.get(`/users`, async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

app.post("/users", async (req, res, next) => {
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

function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  console.log("WHAT IS THIS?", req.params);

  if (isNaN(id)) {
    // returning to stop the request
    return res.status(400).send({ message: "id is not a number, sorry" });
  }

  next();
}

app.get("/users/:id", validateId, async (req, res, next) => {
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

app.delete("/users/:id", validateId, async (req, res, next) => {
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

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
