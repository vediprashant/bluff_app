import React from 'react'
import { Button } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default function GameStatus(props) {
    let game = props.match.params.game
    return (
        <Button.Group>
            <Button 
                onClick={() => props.history.push(`/invite/${game}`)} > 
                Invite Players
            </Button>
            <Button.Or />
            <Button 
                onClick={()=> props.history.push(`/game/${game}`)}
                color='violet'>
                Join Game
            </Button>
        </Button.Group>
    )
}