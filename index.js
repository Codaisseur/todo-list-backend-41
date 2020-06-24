const express = require("express");
const User = require("./models").user;
const PORT = 4000;
const app = express();

// Body parser middleware (helps us parse the body of the requests on POST, UPDATE requests)
app.use(express.json());

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

app.get("/users/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
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
