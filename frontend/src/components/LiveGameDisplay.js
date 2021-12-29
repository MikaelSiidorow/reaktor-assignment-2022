import { useSelector } from 'react-redux'
import ActiveGame from './ActiveGame'

const LiveGameDisplay = () => {

  const liveGames = useSelector(state => state.live)

  if (liveGames.length < 1) {
    return (
      <div className="live">
        <p>No games currently in progress</p>
      </div>
    )
  }
  return (
    <div className="live">
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Player A</th>
            <th>played</th>
            <th>vs</th>
            <th>played</th>
            <th>Player B</th>
          </tr>
          {liveGames.map(game =>
            <ActiveGame key={game.gameId} game={game} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LiveGameDisplay