const express = require("express");
const app = express();
const port = 3000;

app.use("/", express.static("public"));

const budget = {
  myBudget: [
    {
      title: "Eat out",
      budget: 60,
    },
    {
      title: "Rent",
      budget: 460,
    },
    {
      title: "groceries",
      budget: 110,
    },
  ],
};

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/budget", (req, res) => {
  res.send(budget);
});

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
