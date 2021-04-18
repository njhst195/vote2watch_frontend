import Movies from "./Movies"
import { useState, useEffect } from 'react'

const VotingRound1 = ({ setCurrentPage, movieData, userInputTitle, movieRoomID }) => {
    var roundNum = 1

    console.log(movieData)
    console.log(userInputTitle)
    console.log(movieRoomID)
    
    return(
        <div>
            <h1>You are in room: {movieRoomID}</h1>
            <h2>Vote on Movies Below</h2>
            <h3>You are in Round: {roundNum}</h3>
        </div>
        

    )
} 

export default VotingRound1