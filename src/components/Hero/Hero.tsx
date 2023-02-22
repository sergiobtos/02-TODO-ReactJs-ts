import Rocket from '../../assets/Rocket';
import styles from './Hero.module.css';


function Hero() {

  return (
    <div id="hero" className={styles.wrapper}>
      <div className={styles.content}>
        <Rocket />
        <h1>to<span>do</span></h1>
      </div>
    </div>
  )
}

      export default Hero
