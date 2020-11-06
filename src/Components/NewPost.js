import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import styles from './NewPost.module.css'

export default function NewPost({ modify = false, posts, setPosts, ...props }) {
  let post, params, initialState
  if (modify) {
    ;[post] = posts.filter(post => post.id === +props.match.params.id)
    params = `/${post.id}`
    initialState = {
      body: post.body,
      title: post.title
    }
  } else {
    params = ''
    initialState = { title: '', body: '' }
  }

  const history = useHistory()
  const [error, setError] = useState('')
  const [data, setData] = useState(initialState)

  const handleChange = e => {
    const { name, value } = e.target
    setData(state => ({ ...state, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const url = `https://jsonplaceholder.typicode.com/posts${params}`

    let options = {
      method: modify ? 'PATCH' : 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json' }
    }

    const res = await fetch(url, options)

    if (res.ok) {
      const newPost = await res.json()
      newPost.id = posts.length + 1
      if (modify) {
        setPosts(state => {
          const index = state.findIndex(
            post => post.id === +props.match.params.id
          )
          state[index] = { ...state[index], ...data }
          return [...state]
        })
      } else {
        setPosts(state => [newPost, ...state])
      }
      history.push('/')
      console.log(`--- ${options.method} ---`)
      console.log(res)
    } else {
      setError('Error. Try again.')
    }
  }

  return (
    <>
      <h1 className={styles.title}>{modify ? 'Change post' : 'New post'}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            placeholder="This is an awesome post !"
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
            placeholder="Wahooo, NOW I'm a celebrity 🤭"
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
