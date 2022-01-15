import { useSelector } from 'react-redux'
import ActiveGame from './ActiveGame'

const RecentGamesDisplay = () => {

  const history = useSelector(state => state.history)

  return (
    <div className="recent">
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
          {history.slice(0, 15).map(game =>
            <ActiveGame key={game.gameId} game={game} />
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RecentGamesDisplay