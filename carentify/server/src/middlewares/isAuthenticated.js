const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN_HERE
  const secretKey =
    "9b1d4b25859eb7b726e9d79b3bb446b76b880f63698a12de6108b56c3b899602";
  if (token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        console.error(err); // Log the error to see more details
        return res.status(401).send("Unauthorized");
      }
      req.user = decoded; // Add decoded token data to request object
      next();
    });
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = isAuthenticated;
