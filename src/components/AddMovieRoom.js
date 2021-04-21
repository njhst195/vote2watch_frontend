import { useState, useEffect } from 'react';
import Button from "./Button"
import Axios from "axios"




//left off needing to go through the title to get entries
//then need to go through movieData to check for title in array
const AddMovieRoom = ({ movieData, movieRoomID, addButton, mongoRoomID, makeMovieMapArr, getSuggestionIDList, userInputTitle, setCurrentPage }) => {
    const [title, setTitle] = useState('')

    const createSuggestion = async (_callback, mName) => {
        console.log("This is the name that the suggestion will create with", mName)
        //creates a new suggestion in DB using the movie lookup title
        const createSuggestion = await Axios.post("http://localhost:3003/api/suggestions/create", { name: mName })
        //gets the _id of the new suggestion
        const sugID = createSuggestion.data._id
        console.log("The new suggestion id is", sugID)
        //takes the _id of that suggestion, and stores it in the room's movieList string array using the room's _id
        const res = await Axios.put(`http://localhost:3003/api/rooms/addSuggestion/${mongoRoomID}`, { suggestion: sugID})

        console.log(res.data)
        _callback();
    }

    return (
        <form className = 'add-form'>
            <h1>Welcome to Add Movie Page</h1>
            <div className = 'form-control'>
                <label>Enter Movie Title</label>
            </div>
            <div>
                <input type = 'text' required 
                placeholder = 'Title' value = { title } onChange = {(e) => setTitle(e.target.value)}/>
            </div>
            <div> 
                <Button color = "green" text = "Add" onClick = { () =>{

                    console.log('user input is: '+ title)
                    var checkedForTitle = false
                    var titleFound = false

                    var count = 0
                    while(checkedForTitle == false && count < movieData.length){
                        if(title.toLocaleLowerCase() === movieData[count].movieName.toLocaleLowerCase()){
                            console.log('in buisness')
                            addButton(title)
                            titleFound = true
                            checkedForTitle = true
                        }
                        

                        count++
                    }
                    if(titleFound === true) {
                        createSuggestion(getSuggestionIDList, movieData[count-1].movieName).then(() => {
                            makeMovieMapArr()
                            setCurrentPage("VotingRound1") 
                        })
                       
                    } else {
                        alert('Movie not in Netflix Database');
                    }
                    
                }}/>
                <Button color = "red" text = "Exit" onClick = {() => {
                    setCurrentPage("/")
                }}/>
            </div>
        </form>
    )
}

export default AddMovieRoom

/*<Button color = "green" text = "Add" onClick = {addClick(title)} />*/


