import styles from './CountryCard.module.css'
import { Link } from "react-router-dom";

const CountryCard = (props) => {
    return (
        <div className={styles.divCard}>
            <Link to ={`/detail/${props.id}`}><img src={props.image} alt={props.name}></img></Link>
            <p className={styles.txtName}>{props.name}</p>
            <p className={styles.txtContinent}>{props.continent}</p>

        </div>
    );
}

export default CountryCard;