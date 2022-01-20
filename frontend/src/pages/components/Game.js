import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlayedIcon from './PlayedIcon'
import { dateParser } from '../../utils'
import { FaCrown } from 'react-icons/fa'

const Game = ({ game }) => {
  return (
    <Container>
      {game.t ?
        <Row className='justify-content-center'>
          <Col md='auto'>
            {dateParser(game.t)}
          </Col>
        </Row>
        : null
      }
      <Row className='justify-content-between'>
        <Col xs className='text-left'>
            <Link to={`/users/${game.playerA.name}`}>
              {game.playerA.name}
            </Link>
            {game.winner === game.playerA.name ? <FaCrown color='gold' fontSize='2em'/> : null}
        </Col>
        {game.playerA.played ?
          <Col xs className='text-end'>
            <PlayedIcon played={game.playerA.played} />
          </Col>
          : null
        }
        <Col xs>
          <p className='text-center'>Vs</p>
        </Col>
        {game.playerB.played ?
          <Col xs className='text-left'>
            <PlayedIcon played={game.playerB.played} />
          </Col>
          : null
        }
        <Col xs className='text-end'>
          {game.winner === game.playerB.name ? <FaCrown color='gold' fontSize='2em'/> : null}
          <Link to={`/users/${game.playerB.name}`}>
            {game.playerB.name}
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Game