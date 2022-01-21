import React from 'react'
import { FaQuestion } from 'react-icons/fa'
import { GiRock, GiPaper, GiScissors } from 'react-icons/gi'

const PlayedIcon = ({ played, rotated }) => {
  switch (played) {
    case 'ROCK':
      return <GiRock fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    case 'PAPER':
      return <GiPaper fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    case 'SCISSORS':
      return <GiScissors fontSize='2rem' style={{ transform: rotated ? 'rotateY(180deg)' : 'none'}}/>
    default:
      return <FaQuestion />
  }

}

export default PlayedIcon