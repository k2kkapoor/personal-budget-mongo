//Budget API
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
const budget = require("./myBudget.json");
// const budget1 = {
//   myBudget: [
//     {
//       title: "Eat out",
//       budget: 60,
//     },
//     {
//       title: "Rent",
//       budget: 460,
//     },
//     {
//       title: "groceries",
//       budget: 110,
//     },
//   ],
// };

app.get("/budget", (req, res) => {
  console.log(budget);
  res.send(budget);
});

app.listen(port, () => {
  console.log(`API Serving at http://localhost:${port}`);
});
