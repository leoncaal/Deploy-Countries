import styles from './NavBar.module.css';
import { Link } from "react-router-dom"
import SearchBar from '../SearchBar/SearchBar';

const NavBar = () => {
    return (
        <div className={styles.divNav}>
            <div className={styles.divButons}>
                <Link to={'/'}><button className={styles.btn}>Welcome</button></Link>
                <Link to={'/form'}><button className={styles.btn}>Add Activity</button></Link>
            </div>
            
            <div className={styles.divSearch}> <SearchBar></SearchBar></div>
           
        </div>
    )
}

export default NavBar