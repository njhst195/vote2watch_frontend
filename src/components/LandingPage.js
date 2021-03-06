import logo from "../Images/vote2watch10.png"
import Button from "./Button"
import Axios from "axios"

// const reactRouter = require("react-router-dom")

//Landing page component
export const LandingPage = ({ roomData, createUser, movieRoomID, createRoom, guestSearch, setCurrentPage }) => {


    // console.log(reactRouter.useHistory())


    //Added a basic map function at the bottom of this return
    //this can be taken out, but it is good for testing at the moment
    return(
        <div>
            <div className = "logo">
                <img className = "image" src={logo} alt="Vote2Watch Logo"/>   
            </div>
            <h1>
                Welcome to Vote2Watch: {movieRoomID}
            </h1>
            <div>
                <Button color = "red" text = "Host a Game" onClick = {() => {
                    createRoom()
                    setCurrentPage("HostGameRoom")
                }} />
                
            </div>
            <div>
                <Button text = "Find Game" onClick = {() => {
                    guestSearch()
                    createUser()
                    setCurrentPage("GuestGameRoom")
                }} />
            </div>
        </div>
    )
}

export default LandingPage