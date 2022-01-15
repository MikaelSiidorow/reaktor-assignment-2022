import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const AppNavBar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>RPS App</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/users'>Users</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default AppNavBar