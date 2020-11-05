import { useEffect, useState } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css'
import Home from './Home'
import Nav from './Nav'
import NewPost from './NewPost'
import Details from './Details'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getPosts = async () => {
      const url = 'https://jsonplaceholder.typicode.com/posts'
      let data = await (await fetch(url)).json()
      data.sort((a, b) => b.id - a.id)
      setPosts(data)
    }

    getPosts()
  }, [])

  return (
    <div className="App">
      <Router>
        <Nav />
        {posts.length ? (
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Home posts={posts} setPosts={setPosts} {...props} />
              )}
            />
            <Route
              exact
              path="/details/:id"
              render={props => <Details posts={posts} {...props} />}
            />
            <Route
              exact
              path="/edit/:id"
              render={props => (
                <NewPost
                  modify={true}
                  posts={posts}
                  setPosts={setPosts}
                  {...props}
                />
              )}
            />
            <Route
              path="/new"
              render={props => (
                <NewPost posts={posts} setPosts={setPosts} {...props} />
              )}
            />
          </Switch>
        ) : (
          <h3 style={{ color: 'azure', textAlign: 'center' }}>Loading...</h3>
        )}
      </Router>
    </div>
  )
}

export default App
