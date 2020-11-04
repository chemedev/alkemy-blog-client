import styles from './Details.module.css'

export default function Details({ posts, ...props }) {
  const [post] = posts.filter(post => post.id === +props.match.params.id)
  return (
    <>
      <h2 className={styles.title}>{post.title}</h2>
      <h4 className={styles.body}>{post.body}</h4>
    </>
  )
}
