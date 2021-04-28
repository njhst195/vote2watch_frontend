import './App.css';
// import Movies from "./components/Movies";
import LandingPage from "./components/LandingPage";
// import HostGameRoom from "./components/HostGameRoom";
import AddMovieRoom from "./components/AddMovieRoom";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HostGameRoom from './components/HostGameRoom';
import GuestGameRoom from './components/GuestGameRoom';
import VotingRound1 from './components/VotingRound1'
import FinishGameRoom from './components/FinishGameRoom';


// TODO: Learn about state and setting state
//===============================================

//Generates a roomID
const GenRoomID = () => {
  return Math.random().toString(36).slice(2,6).toUpperCase();
}




//main app 
const App = () => {
  //state constants, and their set functions for rooms and movies
  const [roomData, setRoomData] = useState([])
  const [movieData, setMovieData] = useState([])
  const [roomIDData, setRoomIDData] = useState("")

  const [userMongoID, setUserMongoID] = useState("")

  const [mapMovies, setMapMovies] = useState([])
  const [winningMovie, setWinningMovie] = useState("")

  const [mongoRoomID, setMongoRoomID] = useState("")

  const [userInputTitle, setUserInputTitle] = useState("")
  
  //state of the current page
  //used to render specific pages
  const [currentPage, setCurrentPage] = useState("")

  //fetch all rooms
  const fetchRooms = async () => {
    const res = await Axios.get("http://localhost:3003/api/rooms/findAll")
    const data = await res.data
    return data
  }


  //set current page
  //Used to conditionally render a certain component 
  // const setPage = (componentName) => {
  //   setCurrentPage(componentName)
  // }

  //fetch all movies
  const fetchMovies = async () => {
    const res = await Axios.get("http://localhost:3003/api/movies/findAll")
    const data = await res.data
    return data
  }


  const conditionalRender = () => {
    if (currentPage == "HostGameRoom") {
      return(<HostGameRoom 
        movieData = {movieData} 
        movieRoomID = {roomIDData} 
        setCurrentPage = {setCurrentPage}
        />)
    }
    if (currentPage == "GuestGameRoom") {
      return(<GuestGameRoom 
        roomData = {roomData}
        roomIDData = {roomIDData}
        movieData = {movieData} 
        userMongoID = {userMongoID} 
        findRoomByCode = {findRoomByCode}
        updateUserRoom = {updateUserRoom}
        setCurrentPage = {setCurrentPage} 
        guestSearch = {guestSearch}
        />)
    }
    if(currentPage == "AddMovieRoom") {
      return(<AddMovieRoom 
        roomData = {roomData} 
        getSuggestionIDList = {getSuggestionIDList}
        movieData = {movieData} 
        makeMovieMapArr = {makeMovieMapArr}
        mongoRoomID = {mongoRoomID} 
        userInputTitle = {userInputTitle}
        movieRoomID = {roomIDData}
        addButton = {addButton}
        setCurrentPage = {setCurrentPage}
        />)
    }
    if(currentPage == "VotingRound1"){
      return(<VotingRound1  
        movieData = {movieData} 
        mapMovies = {mapMovies}
        makeMovieMapArr = {makeMovieMapArr}
        userInputTitle = {userInputTitle}
        movieRoomID = {roomIDData}
        roomData = {roomData}
        mongoRoomID = {mongoRoomID}
        addButton = {addButton}
        setCurrentPage = {setCurrentPage}
        setMovieWin = {setMovieWin}
        />)
    }
    if(currentPage == "finishGame"){
      return(<FinishGameRoom 
        setMovieWin = {setMovieWin}
        winningMovie = {winningMovie}
        setCurrentPage = {setCurrentPage}
        mongoRoomID = {mongoRoomID}
        mapMovies = {mapMovies}
        movieData = {movieData}
      />)
    }
    //Base State is landing page
    return(<LandingPage 
      movieData = {movieData} 
      roomIDData = {roomIDData}
      roomData = {roomData} 
      createRoom = {makeRoom} 
      createUser = {createUser} 
      guestSearch = {guestSearch} 
      setCurrentPage = {setCurrentPage}
      />)
  }

  //compares the IDs of the movieList string array in a room, and the IDs in all the suggestions
  //sets the useState for movies to be mapped to an array of objects 
  const makeMovieMapArr = () => {
    var mapArray = [{}]

    var IDArr = []
    var suggArr = []
    

    const getSuggestionsInRoom = async (IDArr, suggArr) => {

        var mapCount = 0

        var sugCount, IDCount

        for (sugCount = 0; sugCount < suggArr.length; sugCount++) {
            for (IDCount = 0; IDCount < IDArr.length; IDCount++) {
                if (suggArr[sugCount]._id === IDArr[IDCount]) {
                   mapArray[mapCount] = suggArr[sugCount]
                   mapCount++
                }
                
            }
        }
        setMapMovies(mapArray)
    }

    const getRoomSuggestionIDs = async (_callback, id) => {
            console.log("Room Id to get suggestions for", id)
            const res = await Axios.get(`http://localhost:3003/api/rooms/findAllSuggestions/${id}`)
            IDArr = res.data
            _callback(IDArr, suggArr)
    
    }

    const findSuggArr = async(_callback) => {
        const res = await Axios.get("http://localhost:3003/api/suggestions/findAll")
        suggArr = res.data
        _callback(getSuggestionsInRoom, mongoRoomID)
    }


    findSuggArr(getRoomSuggestionIDs)
  }


  const setMovieWin = (movie) => {
    setWinningMovie(movie)
  }

  
    //OnClick for host room button
  const makeRoom = async() => {
    const movieRoomID = GenRoomID()
    const res = await Axios.post("http://localhost:3003/api/rooms/create", { name: movieRoomID });

    setMongoRoomID(res.data._id)
    setRoomIDData(res.data.name)
  }

  //OnClick for guest room button
  const guestSearch = () => {
    console.log('click')
  }

  const addButton = (movieTitle) => {
    console.log('click ' + movieTitle)
    setUserInputTitle(movieTitle)
  }

  const getSuggestionIDList = async () => {
    console.log("Gets in func in app")
    const res = await Axios.get(`http://localhost:3003/api/rooms/findAllSuggestions/${mongoRoomID}`)
    const suggList = res.data
    return suggList
  }

  const updateUserRoom = async (userID, roomID) => {
    console.log("user mongo id in update", userID)
    console.log("room 4-digit id", roomID)
    const res = await Axios.put(`http://localhost:3003/api/users/updateRoom/${userID}`, { room: roomID});
  }

  const createUser = async () => {
    const res = await Axios.post('http://localhost:3003/api/users/create')
    const data = res.data
    console.log(res.data)
    setUserMongoID(res.data._id)
    console.log("user mongo id", res.data._id)
    return data
  }

  const findRoomByCode = async (code) => {
    const res = await Axios.get(`http://localhost:3003/api/rooms/findOnebyCode/${code}`)
    const data = res.data
    setMongoRoomID(res.data._id)
    console.log(mongoRoomID)
    return data
  }

  //use effect (same as ComponentDidMount), runs when component renders
  useEffect(() => {
    //calls the fetch rooms and changes state of roomData
    const getRooms = async() => {
      const roomsFromBackend = await fetchRooms()
      setRoomData(roomsFromBackend)
    }
    //calls the fetch movies and changes state of movieData
    const getMovies = async() => {
      const moviesFromBackend = await fetchMovies()
      setMovieData(moviesFromBackend)
    }
    
    //if movies has data in it, don't run the fetch again
    if (!movieData.length) {
      getMovies()
    }
    
    //get all the rooms from mongoDB
    getRooms()

  }, [])

  //Switch statement in return controlls what component renders
  return (
    <div className="App">
      {conditionalRender()}
      {/* <LandingPage movieData = {movieData} roomData = {roomData} movieRoomID = {roomIDData}/> */}
      {/* <Switch>
        <Route path = '/' exact
        render = {() => <LandingPage movieData = {movieData} roomData = {roomData} movieRoomID = {roomIDData} />}
      />
        <Route path = '/HostGameRoom'
        render = {() => <HostGameRoom movieData = {movieData} movieRoomID = {roomIDData} />}
      />
        <Route path = '/GuestGameRoom'
        render = {() => <GuestGameRoom roomData = {roomData} />}
      />
      <Route path = '/AddMovieRoom'
        render = {() => <AddMovieRoom roomData = {roomData} movieData = {movieData}/>}
      />
      </Switch> */}
    </div>
  );
}

export default App;
