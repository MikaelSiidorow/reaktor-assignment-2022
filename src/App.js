import React from 'react'
import LiveGameDisplay from './components/LiveGameDisplay'
import RecentGamesDisplay from './components/RecentGamesDisplay'

const App = () => {
  
  return (
    <div className="container">
      <h1>RPS app</h1>
      <hr />
      <h2>In progress</h2>
      <LiveGameDisplay />
      <h2>Recent Games</h2>
      <RecentGamesDisplay />
    </div>
  )
}

export default App
