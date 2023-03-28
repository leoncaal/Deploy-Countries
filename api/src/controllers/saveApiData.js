const axios = require('axios');
const URL = 'https://restcountries.com/v3/all';
const { Country } = require("../db");

const saveApiData = async () => {
    
  try {
    const allCountries = await Country.findAll();
    if (!allCountries.length) {

      const apiDataResponse = await axios(URL);
      
      const apiData = apiDataResponse.data.map((elem) => {
        return {
          id: elem.cca3,
          name: elem.name.common,
          image: elem.flags[0],
          continent: elem.continents[0],
          capital: elem.capital ? elem.capital[0] : 'Not found',
          subregion: elem.subregion,
          area: elem.area,
          population: elem.population,
        };
      });
      await Country.bulkCreate(apiData);
    }
    return console.log("Se cargo la Base de Datos")
  } catch (error) {
    return {error: error.message}
  }
};

module.exports = 
  {saveApiData};
