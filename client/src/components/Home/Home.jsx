import styles from "./Home.module.css";
import plane from '../../utils/plane.gif';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries, getActivities, orderCountries, filter, resetFilters, cleanCountrySearch, currentPage } from "../../redux/actions";
import CountryCard from "../CountryCard/CountryCard";
import Loader from "../Loader/Loader";

const Home = () => {

  const country = useSelector(state => state?.countries);
  const activities = useSelector(state => state?.activities);
  const filterMixBad = useSelector(state => state?.filterMix);
  const current = useSelector(state => state?.currentPage);
  const dispatch = useDispatch();

  const itemsPage = 10;
  const totalPages =  Math.ceil(country.length / itemsPage);
  const arrayPages = [];
  
  for (let i = 0; i < totalPages; i++) {
    arrayPages.push(i + 1);
  }

  const [loading, setLoading] = useState(true);  

  useEffect(() => {
   // dispatch(getAllCountries());
    dispatch(getActivities());

    return () => {
      dispatch(resetFilters());
      dispatch(cleanCountrySearch());
    }

  }, []);

  const nextHandler = () => {
    const totalItems = country.length;
    const nexPage = current + 1;
    const firstIndex = current * itemsPage;

    if (firstIndex >= totalItems - 10 ) {
      return;
    }

    dispatch(currentPage(nexPage));

  };

  const prevHandler = () => {
    const prevPage = current -1;//1

    if (prevPage < 0){
      return;
    }

    dispatch(currentPage(prevPage))

  };

  const pageHandler = (event) => {

    dispatch(currentPage(event.target.name - 1))
  };

  const handlerOrder = (event) =>{
    dispatch(orderCountries(event.target.value));
  }

  const handlerFilter = (event) =>{
    dispatch(filter(event.target.value));
    dispatch(currentPage(0))
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

  setTimeout(() => {
    if (country.length > 0){
      setLoading(false);
    }
  }, "1000");

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
        
        {country.length > 0 && loading === false && 
        <div>
          <div className={styles.divPagesTxt}><h3 className={styles.txtPages}>{current + 1} de {Math.ceil(country.length/10)} </h3></div>
          <div className={styles.divPages}>
            <button className={styles.btn} onClick={prevHandler}>Prev</button>
            <div className={styles.divPagesNum}>{arrayPages.map(ele => ele < 10 ? <button className={ ele === current + 1 ? styles.btnCircPagesCurrent : styles.btnCircPages} name={ele} onClick={pageHandler} key = {ele}>0{ele}</button>: <button className={ ele === current + 1 ? styles.btnCircPagesCurrent : styles.btnCircPages} name={ele} onClick={pageHandler} key = {ele}>{ele}</button>)}</div>
            <button className={styles.btn} onClick={nextHandler}>Next</button>
          </div>
        </div>}
      </div>
    </div>
  );
};
export default Home;
