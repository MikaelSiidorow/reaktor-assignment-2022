import React, { useEffect } from 'react'

import LiveGameDisplay from './pages/components/LiveGameDisplay'
import RecentGamesDisplay from './pages/RecentGamesPage'
import UsersList from './pages/UserListPage'
import UserDisplay from './pages/UserInformationPage'

import Container from 'react-bootstrap/Container'

import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeUsers } from './reducers/userReducer'
import AppNavBar from './pages/components/AppNavBar'
import { initializeGames } from './reducers/historyReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeGames())
  })

  return (
    <Container>
      <Router>
        <AppNavBar />
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
    </Container>
  )
}

export default App
