const express = require("express");

const app = express();

const jwt = require("jsonwebtoken");

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTA1NDYwMjAsImV4cCI6MTY5MDU0NjkyMH0.Pbfs9DxhEvQPOYa1dfkeyi_5P7cdp8BZ-XcyrUaT7Ls";


app.get("/test", (req, res) => {
  const decoded = jwt.decode(token);
  console.log(decoded);

  res.send(decoded);
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});