import styles from './Landing.module.css';
import { Link } from 'react-router-dom';
const Landing = () => {
    return (
        <div className={styles.divBack}>
            <h1 className={styles.text}>"The most great experience around the world"</h1>
            <Link to = {'/home'}><button className={styles.btn}>Visit</button></Link>
        </div>
    )
}
export default Landing;

