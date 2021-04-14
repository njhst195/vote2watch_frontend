import Button from "./Button"

const backClick = () => {
    console.log("click")
}

export const GuestGameRoom = ({ roomData, setCurrentPage, guestSearch }) => {
    return(
        <div>
            <h1>Welcome to Guest Game Room</h1>
            <div>
                <Button color = "gray" text = "Back" onClick = {() => {
                    guestSearch()
                    setCurrentPage("/")
                }}/>
            </div>
        </div>
    )
}

export default GuestGameRoom