import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries, getActivities, orderCountries, filter, resetFilters } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";

const Home = () => {

  const country = useSelector(state => state?.countries);
  const activities = useSelector(state => state?.activities);
  const dispatch = useDispatch();

  const itemsPage = 10;

/*   const [item, setItems] = useState([...country].slice(0, itemsPage)); */
  
  const [current, setCurrent] = useState(0);
  
  
  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getActivities());

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
  }
  const handlerResetFilters = () =>{
    dispatch(resetFilters())
    document.getElementById("continent").value = 'Continentes'
    document.getElementById("activity").value = 'Actividades'
    document.getElementById("order").value = 'Ordenar'
  };

  const mapActName = activities.map(act => act.name);
  

  const newMap = new Set(mapActName);

  let result = [...newMap];

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

          <select className={styles.sel} id="order" defaultValue="Ordenar" onChange={handlerOrder}>
            <option value="Ordenar" disabled="disable">Ordenar</option>
            <option value="Ascendente">ASC A - Z</option>
            <option value="Descendente">DES Z - A</option>
            <option value="Min">Menor Población</option>
            <option value="Max">Mayor Población</option>
          </select>

          <button className={styles.btnReset} onClick={handlerResetFilters}>Reset Filters</button>


        </div>
        {country.length ? <div className={styles.divCards}>
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
        </div> :<div className={styles.divCoin}><h1>No existen coincidencias</h1></div>}
        
        <div className={styles.divPages}>
        <button className={styles.btn} onClick={prevHandler}>Prev</button>
        <h3 className={styles.txtPages}>{current + 1} de {Math.ceil(country.length/10)} </h3>
        <button className={styles.btn} onClick={nextHandler}>Next</button></div>
        
      </div>
    </div>
  );
};
export default Home;
