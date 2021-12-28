import { useSelector } from 'react-redux'
import SingleGame from './SingleGame'

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
          {liveGames.map(game =>
            <SingleGame key={game.gameId} game={game} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default LiveGameDisplay