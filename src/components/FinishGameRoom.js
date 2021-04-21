import axios from "axios"
import Button from "./Button"
import Axios from 'axios'

export const FinishGameRoom = ({ winningMovie, movieData, movieRoomID, setCurrentPage }) => {
    const exit = async() => {
        const res = await Axios.delete("http://localhost:3003/api/suggestions/deleteAll") 
        const res2 = await Axios.delete("http://localhost:3003/api/rooms/deleteAll")


        setCurrentPage("/")
    }


    return(
        <div>
            <h1>The Winning Movie is: <strong>{winningMovie}</strong></h1>
            <div>
                <Button text = "Restart" color = "red" onClick ={() => {
                    exit()
                }}/>
            </div>
        </div>
    )
}

export default FinishGameRoom