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
            render={props => <Details {...props} posts={posts} />}
          />
          <Route
            path="/new"
            render={props => <NewPost setPosts={setPosts} {...props} />}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
