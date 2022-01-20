import React from 'react'
import { QuestionCircle } from 'react-bootstrap-icons'
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi'

const PlayedIcon = ({ played, rotated }) => {
  console.log(rotated)
  switch (played) {
    case 'ROCK':
      return <GiRock fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    case 'PAPER':
      return <GiPaper fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    case 'SCISSORS':
      return <GiScissors fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    default:
      return <QuestionCircle />
  }

}

export default PlayedIcon