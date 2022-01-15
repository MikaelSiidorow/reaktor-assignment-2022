import { useSelector } from 'react-redux'
import Game from '../components/Game'

const RecentGamesDisplay = () => {

  const history = useSelector(state => state.history)

  return (
    <div className="recent">
      {history.slice(0, 15).map(game =>
        <Game key={game.gameId} game={game} />
      )}
    </div>
  )
}

export default RecentGamesDisplay