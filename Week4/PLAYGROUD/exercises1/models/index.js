const mongoose = require("mongoose");
// Define the schema
const populationSchema = new mongoose.Schema({
  Country: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  Year: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  Age: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  M: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  F: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

// Create a model from the schema
const popModel = mongoose.model("population", populationSchema);

module.exports = popModel;
