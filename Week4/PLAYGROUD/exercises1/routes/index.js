const express = require("express");
const popModel = require("../models/index");

const router = express.Router();

router.post("/population", async (req, res) => {
  try {
    // Create a new population instance with data from the current request body
    const newData = new popModel({
      Country: req.body.Country,
      Year: req.body.Year,
      Age: req.body.Age,
      M: req.body.M,
      F: req.body.F,
    });

    // Save the new population data to the database
    const savedData = await newData.save();

    res.status(200).json({
      message: "Population created successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error creating population:", error);

    res.status(500).json({
      message: "Unable to create population",
      error: error.message,
    });
  }
});

// Retrieve total population data for a country
router.get("/population/:countryName", async (req, res) => {
  try {
    const { countryName } = req.params;

    const result = await getTotalPopulationByCountry(countryName);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching total population:", error);

    res.status(500).json({
      message: "Unable to fetch total population",
      error: error.message,
    });
  }
});

// Retrieve continent-level population data for a year and age group
router.get("/continent-population/:year/:age", async (req, res) => {
  try {
    const { year, age } = req.params;

    const result = await getContinentPopulationByYearAndAge(Number(year), age);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching continent population:", error);

    res.status(500).json({
      message: "Unable to fetch continent population",
      error: error.message,
    });
  }
});

// the suction to get popolation
async function getTotalPopulationByCountry(countryName) {
  try {
    const result = await popModel.aggregate([
      {
        $match: { Country: countryName },
      },
      {
        $group: {
          _id: "$Year",
          countPopulation: {
            $sum: {
              $add: ["$M", "$F"],
            },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return result;
  } catch (error) {
    console.error("Error fetching total population:", error);
    throw error;
  }
}

// Example usage:
const countryName = "Netherlands";
getTotalPopulationByCountry(countryName)
  .then((populationData) => {
    console.log(populationData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

async function getContinentPopulationByYearAndAge(year, age) {
  try {
    const pipeline = [
      {
        $match: {
          Year: year,
          Age: age,
        },
      },
      {
        $group: {
          _id: "$Country",
          Year: { $first: "$Year" },
          Age: { $first: "$Age" },
          M: { $sum: "$M" },
          F: { $sum: "$F" },
          TotalPopulation: {
            $sum: { $add: ["$M", "$F"] },
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const result = await popModel.aggregate(pipeline);

    return result;
  } catch (error) {
    console.error("Error fetching continent population:", error);
    throw error;
  }
}

// Example usage:
const year = 2020; // Replace  year
const age = "100+"; // Replace  age group

getContinentPopulationByYearAndAge(year, age)
  .then((continentPopulationData) => {
    console.log(continentPopulationData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = router;
