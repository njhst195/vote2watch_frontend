import Button from "./Button"

export const HostGameRoom = ({ movieData, movieRoomID, setCurrentPage }) => {
console.log(movieRoomID)

    return(
        <div>
            <h1>Welcome to Host Game Room: {movieRoomID}</h1>
            <div>
                <Button color = "green" text = "Start Game" onClick = {() => {
                    setCurrentPage("AddMovieRoom")
                }}/>
            </div>
            <div>
                <Button color = "red" text = "Exit" onClick = {() => {
                    setCurrentPage("/")
                }}/>
            </div>
            <div>
                <h2>Available Movies:</h2>
                {movieData.map((movie) => (<h3 key = {movie._id}>
                    {movie.movieName} || {movie.votes}
                </h3>))}
            </div>
        </div>
    )
}

export default HostGameRoom