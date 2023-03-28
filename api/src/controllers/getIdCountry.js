const { Country, Activity } = require("../db");

const getIdCountry = async (idPais) => {
  try {
      if (idPais){
        const country = await Country.findByPk(idPais, {include: Activity});
      if (country) {
        return country;
      } else {
        throw new Error("No se encontro el pais");
      }
      }
      throw new Error("Ingresa el ID del pais");

  } catch (error) {
    return {error: error.message};
  }
};
module.exports = getIdCountry;
