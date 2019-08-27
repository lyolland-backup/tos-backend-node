const express = require("express");
// const morgan = require("morgan");
const volleyball = require("volleyball");
// const cors = require('cors')

const app = express();

const auth = require("./auth/index");

app.use(volleyball);
// app.use(cors())
app.use(express.json());
 
app.get("/", (req, res) => {
  res.json({
    message: "things are working so far ... 🙃"
  });
});

app.use("/auth", auth);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error("Not Found -" + req.originalUrl);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack
  });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening on port", port);
});
