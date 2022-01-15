const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Access denied" });
  }

  try {
    const SECRET_KEY = "waysfood-batch28";
    const verified = jwt.verify(token, SECRET_KEY);

    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send({
      message: "Invalid token",
    });
  }
};
