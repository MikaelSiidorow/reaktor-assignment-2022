import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import userService from "../services/users"
import UserMatchHistory from "./UserMatchHistory"

const UserDisplay = () => {
  const [user, setUser] = useState(null)
  const userId = useParams().user

  useEffect(() => {
    userService.getUser(userId).then(user =>
      setUser(user))
  }, [userId])

  if (!user) {
    return (
      <div className='user'>
        <h2>{userId}</h2>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className='user'>
      <h2>{userId}</h2>
      <div className='aggregate'>
        <h2>Stats</h2>
        <table>
          <tbody>
            <tr>
              <th>Win Ratio</th>
              <th>Matches Played</th>
              <th>Most Played Hand</th>
            </tr>
            <tr>
              <td>{(user.totalWins/user.totalGames*100).toFixed(2)}%</td>
              <td>{user.totalGames}</td>
              <td>{user.mostPlayed} <i>{(user.handCounts[user.mostPlayed]/user.totalGames * 100).toFixed(2)}%</i></td>
            </tr>
          </tbody>
        </table>
      </div>

      <UserMatchHistory id={userId} />
    </div>
  )

}

export default UserDisplay