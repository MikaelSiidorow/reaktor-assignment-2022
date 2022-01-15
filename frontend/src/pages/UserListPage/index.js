import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector(state => state.users)

  return (
    <div className='userList'>
      {users.map(user =>
        <div key={user.userId}>
          <Link to={`/users/${user.userId}`}>
            {user.userId}
          </Link>
        </div>
      )}
    </div>
  )

}

export default UsersList