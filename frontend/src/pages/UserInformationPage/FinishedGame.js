import { Link } from 'react-router-dom'

const FinishedGame = ({ game }) => {
  return (
    <tr>
      <td>{game.date.substring(0, 10)}</td>
      <td>
        <Link to={`/users/${game.playerA.player}`}>
          {game.playerA.player}
        </Link>
      </td>
      <td>{game.playerA.played}</td>
      <td>vs</td>
      <td>{game.playerB.played}</td>
      <td>
        <Link to={`/users/${game.playerB.player}`}>
          {game.playerB.player}
        </Link>
      </td>
    </tr>
  )
}

export default FinishedGame