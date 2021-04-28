import { useState, useEffect } from 'react'
import Axios from 'axios'
import Button from "./Button"

const VotingRound1 = ({ setCurrentPage, movieData, userInputTitle, setMovieWin, makeMovieMapArr, mapMovies, roomData, mongoRoomID, movieRoomID }) => {
    var roundNum = 1
    
    const addVote = async(id) => {
        const res = await Axios.put(`http://localhost:3003/api/suggestions/updateVotes/${id}`)
        const data = res.data
        await makeMovieMapArr()
        setCurrentPage("VotingRound1") 
        
        console.log(data)
    }

    const addVeto = async(id) => {
        const res = await Axios.put(`http://localhost:3003/api/suggestions/updateVetos/${id}`)
        const data = res.data
        await makeMovieMapArr()
        setCurrentPage("VotingRound1")
        
        
        console.log(data)
    }

    const finishGame = async() => {
        var win = mapMovies[0].name

        for (var i = 1; i < mapMovies.length; i++) {
            if (mapMovies[i].votes > mapMovies[i-1].votes) {
                win = mapMovies[i]
            }
        }
        setMovieWin(win)

        setCurrentPage("finishGame")
    }

    return(
        <div>
            <h1>You are in room: {movieRoomID}</h1>
            <h2>Vote on Movies Below</h2>
            <h3>You are in Round: {roundNum}</h3>
            <div>
            <h2>Movie Suggestions:</h2>
                {mapMovies.map((movie) => (<h3 key = {movie._id}>
                    {movie.name} || {movie.votes} <Button text = "votes" color = "green" onClick = {() => {
                        addVote(movie._id)}}
                        />
                        || {movie.vetos} <Button text = "vetos" color = "red" onClick = {() => {
                        addVeto(movie._id)}}
                        />
                </h3>))}
            </div>
            <div>
                <Button text = "Finish Game" color = "grey" onClick ={() => {
                    finishGame()
                    }}/>
            </div>
        </div>
        

    )
} 

export default VotingRound1