const express = require("express");
const PORT = 4000;
const app = express();
const morgan = require("morgan");
const { chaosMonkeyMiddleWare } = require("./middlewares/monkeys");
const userRoutes = require("./routers/users");

// Body parser middleware (helps us parse the body of the requests on POST, UPDATE requests)
app.use(express.json());
app.use(morgan("dev"));
app.use("/users", userRoutes);

// use a middleware for all routes with: app.use()
// app.use(chaosMonkeyMiddleWare);

app.get(`/hello`, (request, response, next) => {
  response.send("hi from the server! hey");
});

app.listen(PORT, () => console.log(`Server started in port: ${PORT}`));
