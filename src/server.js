const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../build")));

let intermediaries = [
  {
    id: 1,
    order: 2,
    name: "Distributor: US Food",
    createdAt: "2021-05-05T13:25:00",
    type: "range",
    from: 1,
    to: 2,
    step: 0.05,
  },
  {
    id: 2,
    order: 1,
    name: "Retailer: Whole Foods",
    createdAt: "2021-04-29T11:25:00",
    type: "dropdown",
    options: [{ id: 1, option: "Dima", value: 4 }],
  },
];

let products = [
  { id: 1, price: 1.25, name: "Water 1L bottle" },
  { id: 2, price: 1.23, name: "Yogurt" },
];

// Intermediaries

app.get("/api/intermediaries", (req, res) => {
  res.json(intermediaries);
});

app.get("/api/intermediaries/:id", (req, res) => {
  const targetId = req.params.id;
  const targetIntermediary = intermediaries.find(
    (intermediary) => intermediary.id === +targetId
  );

  res.json(targetIntermediary || {});
});

app.delete("/api/intermediaries/:id", (req, res) => {
  const targetId = req.params.id;

  intermediaries = intermediaries.reduce((accum, intermediary) => {
    if (intermediary.id === +targetId) return accum;

    return [...accum, intermediary];
  }, []);

  res.sendStatus(200);
});

app.post("/api/intermediaries", (req, res) => {
  const lastIndex = intermediaries.length - 1;

  intermediaries = [
    ...intermediaries,
    {
      ...req.body,
      id: intermediaries[lastIndex].id + 1,
      createdAt: new Date().toISOString(),
    },
  ];

  res.sendStatus(201);
});

app.put("/api/intermediaries/:id", (req, res) => {
  const targetId = req.params.id;

  intermediaries = intermediaries.reduce((accum, intermediary) => {
    if (intermediary.id === +targetId) {
      return [...accum, { ...intermediary, ...req.body }];
    }

    return [...accum, intermediary];
  }, []);

  res.sendStatus(200);
});

// Products

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.delete("/api/products/:id", (req, res) => {
  const targetId = req.params.id;

  products = products.reduce((accum, product) => {
    if (product.id === +targetId) return accum;

    return [...accum, product];
  }, []);

  res.sendStatus(200);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

app.listen(process.env.PORT || port);
