import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './NewPost.module.css'

export default function NewPost({ setPosts }) {
  const history = useHistory()
  const [data, setData] = useState({ title: '', body: '' })
  const [error, setError] = useState('')

  const handleChange = e => {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const url = 'https://jsonplaceholder.typicode.com/posts'
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    })
    if (res.ok) {
      const newPost = await res.json()
      setPosts(prev => [newPost, ...prev])
      history.push('/')
    } else {
      setError('Error. Try again.')
    }
  }

  return (
    <>
      <h1 className={styles.title}>New post</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className={styles.label} htmlFor="body">
            Body
          </label>
          <textarea
            className={styles.textArea}
            type="text"
            id="body"
            name="body"
            value={data.body}
            onChange={handleChange}
          />
        </div>
        <button
          className={styles.button}
          disabled={data.title === '' || data.body === ''}
          type="submit"
        >
          Submit
        </button>
        {error && <h4>{error}</h4>}
      </form>
    </>
  )
}
