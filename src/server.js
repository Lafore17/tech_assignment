const express = require("express");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

let intermediaries = [
  {
    id: 1,
    name: "Distributor: US Food",
    order: 2,
    createdAt: "2021-05-05T13:25:00",
  },
  {
    id: 2,
    name: "Retailer: Whole Foods",
    order: 1,
    createdAt: "2021-04-29T11:25:00",
  },
];

app.get("/intermediaries", (req, res) => {
  res.json(intermediaries);
});

app.get("/intermediaries/:id", (req, res) => {
  const targetId = req.params.id;
  const targetIntermediary = intermediaries.find(
    (intermediary) => intermediary.id === +targetId
  );

  res.json(targetIntermediary || {});
});

app.delete("/intermediaries/:id", (req, res) => {
  const targetId = req.params.id;

  intermediaries = intermediaries.reduce((accum, intermediary) => {
    if (intermediary.id === +targetId) return accum;

    return [...accum, intermediary];
  }, []);

  res.sendStatus(200);
});

app.listen(port);
