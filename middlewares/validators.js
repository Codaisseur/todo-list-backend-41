function validateId(req, res, next) {
  const id = parseInt(req.params.id);
  console.log("WHAT IS THIS?", req.params);

  if (isNaN(id)) {
    // returning to stop the request
    return res.status(400).send({ message: "id is not a number, sorry" });
  }

  next();
}

module.exports = {
  validateId: validateId,
};
