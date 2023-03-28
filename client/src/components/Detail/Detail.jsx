import styles from "./Detail.module.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCountryDetail, cleanCountryDetail } from "../../redux/actions";
import { Link } from "react-router-dom";
const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const country = useSelector((state) => state.countryDetail);

  useEffect(() => {
    dispatch(getCountryDetail(id));
    return () => dispatch(cleanCountryDetail());
  }, []);

  return (
    <div className={styles.divBack}>
      <div className={styles.divNav}><Link to={"/home"}><button className={styles.btn}>Home</button></Link></div>
      <div className={styles.divBlur}>
        
      
        <div className={styles.divDetail}>
          <div className={styles.divImg}>
            <img src={country.image} alt={country.name} />
          </div>

          <div className={styles.divProps}>
            <h1>{country.name}</h1>
            <h3>{`Continente: ${country.continent}`}</h3>
            <h3>{`Capital: ${country.capital}`}</h3>
            <h3>{`Subregion: ${country.subregion}`}</h3>
            <h3>{`Area: ${country.area}`}</h3>
            <h3>{`Población: ${country.population}`}</h3>
            <h3>Actividades:</h3>

            {country.activities?.length ? (
              country.activities?.map((elem) => {
                console.log(elem.name);
                return (
                  <div className={styles.divAct} key={elem.id}>
                    <div className={styles.divName}>
                      <h3>{elem.name}</h3>
                    </div>
                    <div>
                        <ul>
                            <li><h3>Dificultad: {elem.difficulty}</h3></li>
                            <li><h3>Duración: {elem.duration} hrs</h3></li>
                            <li><div className={styles.txtSeasons}><h3>Epoca del año: </h3><h3>{elem.season.map(e => <p key={e}>- {e}</p>)}</h3></div></li>
                            
                        </ul>
                        
                      
                      
                    </div>
                  </div>
                );
              })
            ) : (
              <h5>"Aun no hay actividades en este pais"</h5>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
