import { ListGroup } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const UsersList = () => {
  const users = useSelector(state => state.users)

  return (
    <div className='userList'>
      <ListGroup>
        {users.map(user =>
          <ListGroup.Item key={user.name}>
            <Link to={`/users/${user.name}`}>
              {user.name}
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )

}

export default UsersList