import { useState, useEffect } from 'react';
import Button from "./Button"
import Movies from "./Movies"
import Axios from "axios"

//left off needing to go through the title to get entries
//then need to go through movieData to check for title in array
const AddMovieRoom = ({ movieData, movieRoomID, addButton, userInputTitle, setCurrentPage }) => {
    const [title, setTitle] = useState('')

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
                       console.log(movieData[count-1]._id) 
                       setCurrentPage("VotingRound1")
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


