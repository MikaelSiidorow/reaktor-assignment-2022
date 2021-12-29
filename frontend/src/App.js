import React, { useEffect } from 'react'

import LiveGameDisplay from './components/LiveGameDisplay'
import RecentGamesDisplay from './components/RecentGamesDisplay'
import UsersList from './components/UsersList'
import UserDisplay from './components/UserDisplay'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  })

  return (
    <div className="container">
      <Router>
        <h1><Link to='/'>RPS App</Link><Link to='/users'>Users</Link></h1>
        <hr />
        <h2>In progress</h2>
        <LiveGameDisplay />

        <Switch>
          <Route path='/users/:user'>
            <UserDisplay />
          </Route>
          <Route path='/users'>
            <h2>Users</h2>
            <UsersList />
          </Route>
          <Route path='/'>
            <h2>Recent Games</h2>
            <RecentGamesDisplay />
          </Route>
        </Switch>

      </Router>
    </div>
  )
}

export default App
