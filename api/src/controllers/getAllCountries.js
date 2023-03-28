const { Country, Activity } = require("../db");

const getAllCountries = async () => {
  try {
    const allCountries = await Country.findAll({include: Activity});
    return allCountries;
  } catch (error) {
    return { error: error.message };
  }
};
module.exports = getAllCountries;