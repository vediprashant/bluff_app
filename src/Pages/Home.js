import React from 'react'
export default function Home(props){
    var ws = new WebSocket('ws://localhost:8000/ws/chat/1/')
    return(
        <h1>Home</h1>
    )
}