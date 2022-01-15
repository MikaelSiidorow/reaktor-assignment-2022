import { useSelector } from 'react-redux'
import Game from './Game'

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

      {liveGames.map(game =>
        <Game key={game.gameId} game={game} />
      )}
    </div>
  )
}

export default LiveGameDisplay