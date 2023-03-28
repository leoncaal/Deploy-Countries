import styles from "./Form.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getAllCountries, addActivity } from "../../redux/actions";
import { Link } from "react-router-dom";

const Form = () => {

  const country = useSelector((state) => state.countries);
  const dispatch = useDispatch();  

  const countriesSelected = [];

  useEffect(() => {
    dispatch(getAllCountries());
  }, []);

  const [inputs, setInputs] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    countries:[]
  });


  const [errors, setErrors] = useState({});
  console.log(errors);

  inputs.countries.forEach(element => {
    countriesSelected.push(country.find(c => c.id === element))
  });

  const handlerChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const handlerSeasons = (event) => {
    if (event.target.checked){
        setInputs({
            ...inputs,
            season: [...inputs.season, event.target.value],
          });
    } else{
        setInputs({
            ...inputs,
            season: inputs.season.filter(sea => sea !== event.target.value)
        })
    }
  };

  const handlerCountries = (event) => {
    if (inputs.countries.filter(country => country === event.target.value).length){
        window.alert("Ya selecionaste ese pais")
    } else{
        setInputs({
        ...inputs,
        countries: [...inputs.countries, event.target.value],
    });
    }
  };

  const handlerClose = (event) => {
    setInputs({
        ...inputs,
        countries: inputs.countries.filter(c => c !== event.target.value)
    })
  };

  useEffect(() => {
    setErrors(validate(inputs));
  }, [inputs]);

  const handlerSubmit = (event) => {
    event.preventDefault();
    const numErrors = Object.keys(errors).length;
    if (numErrors === 0){
      dispatch(addActivity(inputs));
      window.alert("Actividad creada con exito");
      window.location.reload();
    } else {
      window.alert("Completa todos los campos");
    }
    
  };

  return (
    <div className={styles.divBack}>
      <div className={styles.divBlur}>
      <div className={styles.divNav}><Link to={"/home"}><button className={styles.btn}>Home</button></Link></div>
        <h1 className={styles.txtAct}>Agregar actividades.</h1>
        <div>
          <form onSubmit={handlerSubmit} className={styles.Form}>
            <div className={styles.divName}>
            <label className={styles.txtLabel}>Nombre: </label>
            <input
              name="name"
              value={inputs.name}
              onChange={handlerChange}
              className={styles.inpName}
            ></input>
            {errors.name && <p className={styles.txtWarning}>{errors.name}</p>}
            </div>
            <div className={styles.divDif}>
            <label className={styles.txtLabel}>Dificultad:</label>
            <input
              name="difficulty"
              type="range"
              min="1"
              max="5"
              step="1"
              value={inputs.difficulty}
              onChange={handlerChange}
              list="listDif"
            ></input>
            <datalist id="listDif">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option value="4"></option>
              <option value="5"></option>
            </datalist>
            <label className={styles.txtLabel} name="valor">{inputs.difficulty}</label>
            {errors.difficulty && <p className={styles.txtWarning}>{errors.difficulty}</p>}
            </div>
            <div className={styles.divDur}>
            <label className={styles.txtLabel}>Duración:</label>
            <input
              name="duration"
              type="range"
              min="1"
              max="24"
              step="1"
              value={inputs.duration}
              onChange={handlerChange}
              list="listHours"
            ></input>
            <datalist id="listHours">
              <option value="2"></option>
              <option value="4"></option>
              <option value="6"></option>
              <option value="8"></option>
              <option value="10"></option>
              <option value="12"></option>
              <option value="14"></option>
              <option value="16"></option>
              <option value="18"></option>
              <option value="20"></option>
              <option value="22"></option>
              <option value="24"></option>
            </datalist>
            <label className={styles.txtLabel} name="valor">{inputs.duration} hrs.</label>
            {errors.duration && <p className={styles.txtWarning}>{errors.duration}</p>}
            </div>
            <div className={styles.divSea}>
            <label className={styles.txtLabel}>Epoca del año:</label>
            <label className={styles.txtSeasons}>
              <input type="checkbox" onChange={handlerSeasons} value="Primavera"/>
              Primavera
            </label>
            <label className={styles.txtSeasons}>
              <input type="checkbox" onChange={handlerSeasons} value="Verano" />
              Verano
            </label>
            <label className={styles.txtSeasons}>
              <input type="checkbox" onChange={handlerSeasons} value="Otoño" />
              Otoño
            </label>
            <label className={styles.txtSeasons}>
              <input type="checkbox" onChange={handlerSeasons} value="Invierno"/>
              Invierno
            </label>
            {errors.season && <p className={styles.txtWarning}>{errors.season}</p>}
            </div>
            <div className={styles.divCouOp}>
            <label className={styles.txtLabel}>Selecciona uno o mas paises:</label>
            <select onChange={handlerCountries} className={styles.selectCountry} defaultValue={"DEFAULT"}>
            <option value="DEFAULT" disabled="disable">
            Paises
          </option>
            { country?.map(count=> <option value={count.id} key={count.id}>{count.name}</option>)}
            </select>
            </div>
            <div className={styles.divCountries}>
            <h4 className={styles.txtLabel}>Paises Seleccionados:</h4>
            {errors.countries && <p className={styles.txtWarning}>{errors.countries}</p>}
          </div>
          {
                countriesSelected.map(cs => <p className={styles.pCountry} key = {cs.id}><button className={styles.butonx} onClick={handlerClose} value = {cs.id}>x</button> {cs.name}</p>)
            }
            <div className={styles.divAdd}>
              <button type="submit"className={styles.btn2} disabled = {Object.keys(errors).length !== 0 ? true : false} >Agregar</button>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export function validate(inputs) {
  let errors = {};

  if (!inputs.name) {
    errors.name = "Se requiere un nombre";
  } else {
    if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(inputs.name)) {
      errors.name = "Nombre invalido";
    }
  }
  if (!inputs.difficulty) {
    errors.difficulty = "Seleccione la dificultad";
  }
  if (!inputs.duration) {
    errors.duration = "Seleccione la duración";
  }
  if (!inputs.season.length){
    errors.season = "Seleccione una epoca del año";
  }
  if (!inputs.countries.length){
    errors.countries = "Seleccione un pais";
  }

  return errors;
}

export default Form;