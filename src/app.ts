import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World! Hi there bizan!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  return console.log(`Server listening on port ${port}`);
});
