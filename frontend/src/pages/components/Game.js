import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PlayedIcon from './PlayedIcon'
import { dateParser } from '../../utils'

const Game = ({ game }) => {
  const aName = game.playerA.name ? game.playerA.name : game.playerA.player
  const bName = game.playerB.name ? game.playerB.name : game.playerB.player

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
            <Link to={`/users/${aName}`}>
              {aName}
            </Link>
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
          <Link to={`/users/${bName}`}>
            {bName}
          </Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Game