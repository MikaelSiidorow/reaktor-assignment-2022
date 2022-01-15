import { Link } from 'react-router-dom'

const ActiveGame = ({ game }) => {

  return (
    <tr>
      <td>{game.t ? (new Date(game.t)).toTimeString().substring(0, 8) : 'ongoing'}</td>
      <td>
        <Link to={`/users/${game.playerA.name}`}>
          {game.playerA.name}
        </Link>
      </td>
      <td>{game.playerA.played ? game.playerA.played : '?????'}</td>
      <td>vs</td>
      <td>{game.playerB.played ? game.playerB.played : '?????'}</td>
      <td>
        <Link to={`/users/${game.playerB.name}`}>
          {game.playerB.name}
        </Link>
      </td>
    </tr>
  )
}

export default ActiveGame