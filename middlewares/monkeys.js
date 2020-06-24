function chaosMonkeyMiddleWare(req, res, next) {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) {
    res
      .status(500)
      .send({ message: "You have been visited by the chaosmonkey" });
  }

  next();
}

module.exports = {
  chaosMonkeyMiddleWare: chaosMonkeyMiddleWare,
};
