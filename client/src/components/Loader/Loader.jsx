import styles from './Loader.module.css';
import spinner from '../../utils/spinner.gif';
const Loader = () => {

    return(
        <div className={styles.divLoader}>
            <img src={spinner} alt='Load'/>
            <h1 className={styles.txtLoading}>Loading ...</h1>
        </div>
    );
}

export default Loader;