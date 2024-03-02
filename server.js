const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongooseSchema = require("./model");
const { timeProvider, dateProvider } = require("./date");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => console.log("connected"))
  .catch((error) => console.error(error));

app.get("/", (req, res) => {
  mongooseSchema
    .find()
    .then((items) => res.status(200).json(items))
    .catch((err) => console.log(err));
});

app.post("/", (req, res) => {
  const item = new mongooseSchema({
    text: req.body.text,
    date: dateProvider(),
    time: timeProvider(),
  });

  item
    .save()
    .then(() => {
      mongooseSchema
        .find()
        .then((items) => res.json(items))
        .catch((err) => console.log(err));
    })
    .catch((error) => console.log(error));
});

app.delete("/:id", (req, res) => {
  const _id = req.params.id;
  mongooseSchema.findByIdAndDelete(_id).then(() => {
    mongooseSchema
      .find()
      .then((items) => res.json(items))
      .catch((err) => {
        console.log(err);
      });
  });
});

app.delete("/items/clear", (req, res) => {
  mongooseSchema
    .deleteMany({})
    .then(() => {
      res.status(200).send("Successfully cleared all documents");
    })
    .catch((err) => {
      console.error("Error clearing documents:", err);
    });
});

//

app.listen(process.env.PORT || 3000);
