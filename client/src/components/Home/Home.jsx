import styles from "./Home.module.css";
import plane from '../../utils/plane.gif';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries, getActivities, orderCountries, filter, resetFilters, cleanCountrySearch } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";
import Loader from "../Loader/Loader";

const Home = () => {

  const country = useSelector(state => state?.countries);
  const activities = useSelector(state => state?.activities);
  const filterMixBad = useSelector(state => state?.filterMix);
  const dispatch = useDispatch();

  const itemsPage = 10;

/*   const [item, setItems] = useState([...country].slice(0, itemsPage)); */
  
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());
    
    return () => {
      dispatch(resetFilters());
      dispatch(cleanCountrySearch());
    }

  }, [dispatch]);

  const nextHandler = () => {
    const totalItems = country.length;
    const nexPage = current + 1;
    const firstIndex = current * itemsPage;
    console.log(firstIndex);
    console.log(totalItems);
    if (firstIndex >= totalItems - 10 ) {
      return;
    }
    /* setItems([...country].slice(firstIndex, firstIndex + 10 )); */

    setCurrent(nexPage);

  };

  const prevHandler = () => {
    const prevPage = current -1;//1
/*     const firstIndex = (current * itemsPage)-20 ;//20 */

    if (prevPage < 0){
      return;
    }
/*     setItems([...country].slice(firstIndex, firstIndex + 10)); */

    setCurrent(prevPage);

  };

  const handlerOrder = (event) =>{
    dispatch(orderCountries(event.target.value));
  }

  const handlerFilter = (event) =>{
    dispatch(filter(event.target.value));
    setCurrent(0);
  }

/*   const handlerFilterByDif = (event) =>{
    dispatch(filterByDif(event.target.value))
  } */



  const handlerResetFilters = () =>{
    dispatch(resetFilters())
    document.getElementById("continent").value = 'Continentes'
    document.getElementById("activity").value = 'Actividades'
    document.getElementById("order").value = 'Ordenar'
  };

  const mapActName = activities.map(act => act.name);
  

  const newMap = new Set(mapActName);

  let result = [...newMap];

  setTimeout(() => {
    if (country.length > 0){
      setLoading(false);
    }
  }, "1500");

  return (
    <div className={styles.divBack}>
      <div className={styles.divBlur}>
        <div>

          <select className={styles.sel} id="continent" defaultValue="Continentes" onChange={handlerFilter}>
          <option value="Continentes" disabled="disable">Continentes</option>
            <option value="Africa">Africa</option>
            <option value="Antarctica" >Antarctica</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="North America">North America</option>
            <option value="Oceania">Oceania</option>
            <option value="South America">South America</option>
          </select>

          <select className={styles.sel} id="activity" defaultValue="Actividades" onChange={handlerFilter}>
          <option value="Actividades" disabled="disable">Actividades</option>
            {result.map(act => <option value={act} key={act}>{act}</option> )}
          </select>


{/*           <select className={styles.sel} id="activity" defaultValue="Dificultad" onChange={handlerFilterByDif}>
            <option value="Dificultad" disabled="disable">Dificultad</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select> */}




          <select className={styles.sel} id="order" defaultValue="Ordenar" onChange={handlerOrder}>
            <option value="Ordenar" disabled="disable">Ordenar</option>
            <option value="Ascendente">ASC A - Z</option>
            <option value="Descendente">DES Z - A</option>
            <option value="Min">Menor Población</option>
            <option value="Max">Mayor Población</option>
          </select>

          <button className={styles.btnReset} onClick={handlerResetFilters}>Reset Filters</button>

        </div>

        { loading === true ? <div className={styles.divWorld}><Loader /></div>:

         <div className={styles.divCards}>
          {country.slice(current * 10, (current * 10) + 10).map(count => {
            return (
              <div className={styles.divCard} key={count.id}>
                 <CountryCard
                  id={count.id}
                  image={count.image}
                  name={count.name}
                  continent={count.continent}
                />
              </div>
            );
          })}
        </div>
        }

       

        {filterMixBad === true  && <div className={styles.divCoin}> <img className={styles.imgPlane} src={plane} alt="plane"/><h1 className={styles.txtCoin}>No existen coincidencias</h1></div>}
        
        {country.length > 0 && loading === false && <div className={styles.divPages}>
        <button className={styles.btn} onClick={prevHandler}>Prev</button>
        <h3 className={styles.txtPages}>{current + 1} de {Math.ceil(country.length/10)} </h3>
        <button className={styles.btn} onClick={nextHandler}>Next</button></div>}
        
        
      </div>
    </div>
  );
};
export default Home;
