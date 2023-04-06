import styles from './SearchBar.module.css'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCountryByName, currentPage } from "../../redux/actions";

const SearchBar = () => {

    const dispatch = useDispatch();
    const [country, setCountry] = useState('');


    useEffect(() => {
        dispatch(getCountryByName(country));

    },[ country ])

    const handleChange = ( event ) =>{ 
        setCountry(event.target.value);
        dispatch(currentPage(0))
    }

    return(
        <div className={styles.divBuscar}>
            <input className={styles.inpBuscar} type="search" value={country} onChange={handleChange} placeholder="Nombre del pais"/>
        </div>
    )
}

export default SearchBar