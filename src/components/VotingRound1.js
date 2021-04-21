import { useState, useEffect } from 'react'
import Axios from 'axios'

const VotingRound1 = ({ setCurrentPage, movieData, userInputTitle, mapMovies, roomData, mongoRoomID, movieRoomID }) => {
    var roundNum = 1
    var mapArray = [{}]
    
    // var IDArr = []
    // var suggArr = []
    

    // const getSuggestionsInRoom = async (IDArr, suggArr) => {
    //     console.log(IDArr)
    //     console.log(suggArr)

    //     var mapCount = 0

    //     var sugCount, IDCount

    //     for (sugCount = 0; sugCount < suggArr.length; sugCount++) {
    //         for (IDCount = 0; IDCount < IDArr.length; IDCount++) {
    //             if (suggArr[sugCount]._id === IDArr[IDCount]) {
    //                mapArray[mapCount] = suggArr[sugCount]
    //                mapCount++
    //             }
                
    //         }
    //     }
    //     console.log(suggArr[0]._id)
    //     console.log(mapArray[0])

    // }

    // const getRoomSuggestionIDs = async (_callback, id) => {
    //         console.log("Room Id to get suggestions for", id)
    //         const res = await Axios.get(`http://localhost:3003/api/rooms/findAllSuggestions/${id}`)
    //         IDArr = res.data
    //         console.log("Suggestion ID array inside original get", IDArr)
    //         _callback(IDArr, suggArr)
    // }

    // const findSuggArr = async(_callback) => {
    //     const res = await Axios.get("http://localhost:3003/api/suggestions/findAll")
    //     suggArr = res.data
    //     _callback(getSuggestionsInRoom, mongoRoomID)
    // }


    


    // console.log(roomData)
    // console.log(mongoRoomID)
    // console.log(movieData)
    // console.log(userInputTitle)
    // console.log(movieRoomID)


    // findSuggArr(getRoomSuggestionIDs)
 
    
    
    return(
        <div>
            <h1>You are in room: {movieRoomID}</h1>
            <h2>Vote on Movies Below</h2>
            <h3>You are in Round: {roundNum}</h3>
            <div>
            <h2>Movie Suggestions:</h2>
                {mapMovies.map((movie) => (<h3 key = {movie._id}>
                    {movie.name} || {movie.votes} || {movie.vetos}
                </h3>))}
            </div>
        </div>
        

    )
} 

export default VotingRound1