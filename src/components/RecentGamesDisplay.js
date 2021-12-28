import { useSelector } from 'react-redux'
import SingleGame from './SingleGame'

const RecentGamesDisplay = () => {

  const history = useSelector(state => state.history)

  return (
    <div className="recent">
      <table>
        <tbody>
          {history.slice(0, 15).map(game =>
            <SingleGame key={game.gameId} game={game} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecentGamesDisplay