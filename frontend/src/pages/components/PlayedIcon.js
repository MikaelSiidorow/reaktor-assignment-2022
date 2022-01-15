import React from 'react'
import { Scissors, Octagon, Square, QuestionCircle } from 'react-bootstrap-icons'

const PlayedIcon = ({ played }) => {

  switch (played) {
    case 'ROCK':
      return <Octagon />
    case 'PAPER':
      return <Square />
    case 'SCISSORS':
      return <Scissors />
    default:
      return <QuestionCircle />
  }

}

export default PlayedIcon