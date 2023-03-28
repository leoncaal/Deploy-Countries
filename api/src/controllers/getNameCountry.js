const { Country, Activity } = require("../db");

const getNameCountry = async (name) => {
  try{
      const allCountries = await Country.findAll({ include: Activity });
      const country = await allCountries.filter(elem => elem.name.toLowerCase().startsWith(name.toLowerCase()));
      if (country.length) {
        return country;
      } else {
        throw new Error("No se encontro el pais");
      }
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = getNameCountry;
