import { useEffect } from "react"
import { Table } from "react-bootstrap"
import { useParams } from "react-router-dom"
import UserMatchHistory from "./UserMatchHistory"
import { useDispatch, useSelector } from 'react-redux'
import { updateUserData } from '../../reducers/userReducer'
import _ from 'lodash'

const UserDisplay = () => {
  const name = useParams().user
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateUserData(name))
  }, [name, dispatch])

  const user = useSelector(state => state.users).find(u => u.name === name)

  if (!user || !user.totalGames) {
    return (
      <div className='user'>
        <h2>{name}</h2>
        <p>Loading...</p>
      </div>
    )
  }

  const mostPlayed = _
    .chain(user.handCounts)
    .toPairs()
    .maxBy(_.last())
    .first()
    .value()

  return (
    <div className='user'>
      <h2>{name}</h2>
      <div className='aggregate'>
        <h2>Stats</h2>
        <Table bordered>
          <tbody>
            <tr>
              <th>Win Ratio</th>
              <th>Matches Played</th>
              <th>Most Played Hand</th>
            </tr>
            <tr>
              <td>{(user.totalWins/user.totalGames*100).toFixed(2)}%</td>
              <td>{user.totalGames}</td>
              <td>{mostPlayed} <i>{(user.handCounts[mostPlayed]/user.totalGames * 100).toFixed(2)}%</i></td>
            </tr>
          </tbody>
          </Table>
      </div>

      <UserMatchHistory name={name} />
    </div>
  )

}

export default UserDisplay