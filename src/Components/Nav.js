import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

export default function Nav() {
  return (
    <nav>
      <Link className={styles.link} to="/">
        Home
      </Link>
      <span className={styles.line}>|</span>
      <Link className={styles.link} to="/new">
        New Post
      </Link>
    </nav>
  )
}
