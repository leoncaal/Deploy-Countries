const { Router } = require("express");
const getAllCountries = require("../controllers/getAllCountries");
const getIdCountry = require("../controllers/getIdCountry");
const getNameCountry = require("../controllers/getNameCountry");
const router = Router();

router.get('/', async (req, res) => {
  const { name } = req.query
try {
  if (name) {
      const country = await getNameCountry(name);
      if (country.error){
        throw new Error (country.error);
      } else {
        res.status(200).json(country);
      }
  } else {
    const allCountries = await getAllCountries();
    res.status(200).json(allCountries);
  }
} catch (error) {
  res.status(404).send(error.message)
}
  
});

router.get("/:idPais", async (req, res) => {
  const {idPais} = req.params;
    try {
        const country = await getIdCountry(idPais);

        if (country.error) {
          throw new Error(country.error);
        }
        res.status(200).json(country);
    } catch (error) {
        res.status(404).send(error.message);
    }
});


module.exports = router;