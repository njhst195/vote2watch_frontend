import Movies from "./Movies"
import { useState, useEffect } from 'react'
import Axios from 'axios'

const VotingRound1 = ({ setCurrentPage, movieData, allSuggestionList, userInputTitle, mongoRoomID, movieRoomID }) => {
    var roundNum = 1

    const getRoomSuggestionIDs = async (id) => {
        console.log("Room Id to get suggestions for", id)
        const res = await Axios.get(`http://localhost:3003/api/rooms/findAllSuggestions/${id}`)
        const data = res.data
        console.log("Suggestion ID array inside original get", data)
        return data
    }

    // const findSuggestionsFromIDs = async () => {
    //     const IDlist = getSuggestionIDList().then(async() => {
    //         const res = await Axios.get("http://localhost:3003/api/suggestions/findAll")
    //         const data = res.data
    //         console.log("All Suggestions: ", data)  
    //     })

    //     console.log("Room suggestion ID List", IDlist)
        
    // }


    // findSuggestionsFromIDs()

       

        // var suggCount
        // var dataCount
        // var suggestionArr = []

        // for (suggCount = 0; suggCount < suggIDArr.length; suggCount++) {
        //     for (dataCount = 0; dataCount < data.length; dataCount++) {
        //         if (suggIDArr[suggCount]._id == data[dataCount]._id) {
        //             suggestionArr.push(suggIDArr[suggCount])
        //         }
        //     }
        // }
        // console.log("These are the suggestions for the room", suggestionArr)
        // return suggestionArr
    

    console.log(allSuggestionList)
    console.log(mongoRoomID)
    console.log(movieData)
    console.log(userInputTitle)
    console.log(movieRoomID)

    getRoomSuggestionIDs(mongoRoomID)

    
    
    return(
        <div>
            <h1>You are in room: {movieRoomID}</h1>
            <h2>Vote on Movies Below</h2>
            <h3>You are in Round: {roundNum}</h3>
        </div>
        

    )
} 

export default VotingRound1