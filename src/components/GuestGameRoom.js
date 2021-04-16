import Button from "./Button"
import { useState, useEffect } from 'react';


export const GuestGameRoom = ({ roomData, setCurrentPage, guestSearch }) => {
    const [searchRoom, setSearchRoom] = useState('')

    return(
        <form className = 'roomSearch-form'>
            <h1>Welcome to Search Room Page</h1>
                <div className = 'roomForm-control'>
                    <label>Enter a 4-digit game room code</label>
                </div>
                <div>
                    <input type = 'text' required 
                    placeholder = 'Room Code' value = { searchRoom } onChange = {(e) => setSearchRoom(e.target.value)}/>
                </div>
                <div> 
                    <Button color = "green" text = "Search" onClick = { () =>{
                    console.log('user input is: '+ searchRoom)
                    var checkedForRoom = false
                    var roomFound = false

                    while(checkedForRoom == false){
                    for(var i = 0; i < roomData.length; i++){
                        if(searchRoom.toLocaleLowerCase() === roomData[i].name.toLocaleLowerCase()){
                            console.log('Room Exists')
                            roomFound = true
                            checkedForRoom = true
                        }
                    }
                    checkedForRoom = true
                }
                    if(roomFound === false){
                        alert('Room does not exist');
                    }
                }}/>
            <Button color = "red" text = "Exit" onClick = {() => {
                guestSearch()
                setCurrentPage("/")
            }}/>
            </div>
        </form>
    )
}

export default GuestGameRoom