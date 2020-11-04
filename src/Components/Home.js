import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home({ posts, setPosts }) {
  const handleDelete = async id => {
    try {
      const url = `https://jsonplaceholder.typicode.com/posts/${id}`
      const res = await fetch(url, {
        method: 'DELETE'
      })
      if (res.ok) {
        console.log(res)
        setPosts(posts => posts.filter(post => post.id !== id))
      } else alert('Something went wrong...')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h1 className={styles.title}>Posts</h1>
      <ul className={styles.list}>
        {posts.map((post, index) => (
          <li className={styles.listItem} key={index}>
            <span className={styles.listNumber}>{post.id}</span>
            <span className={styles.listText}>{post.title}</span>
            <Link to={`/details/${post.id}`}>
              <button className={styles.button}>🔎</button>
            </Link>
            <Link to={`/edit/${post.id}`}>
              <button className={styles.button}>✒️</button>
            </Link>
            <button
              className={styles.button}
              onClick={() => handleDelete(post.id)}
            >
              🗑
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}
