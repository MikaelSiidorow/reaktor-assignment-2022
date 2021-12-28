const SingleGame = ({ game }) => {

  return (
    <tr>
      <td>{game.t ? (new Date(game.t)).toTimeString().substring(0, 8) : 'ongoing' }</td>
      <td>{game.playerA.name}</td>
      <td>{game.playerA.played ? game.playerA.played : '?????'}</td>
      <td>vs</td>
      <td>{game.playerB.played ? game.playerB.played : '?????'}</td>
      <td>{game.playerB.name}</td>
    </tr>
  )
}

export default SingleGame