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
  const [roomIDData, setRoomIDData] = useState([])

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
        movieData = {movieData} 
        setCurrentPage = {setCurrentPage} 
        guestSearch = {guestSearch}
        />)
    }
    if(currentPage == "AddMovieRoom") {
      return(<AddMovieRoom 
        roomData = {roomData} 
        movieData = {movieData} 
        userInputTitle = {userInputTitle}
        movieRoomID = {roomIDData}
        addButton = {addButton}
        setCurrentPage = {setCurrentPage}
        />)
    }
    //Base State is landing page
    return(<LandingPage 
      movieData = {movieData} 
      roomData = {roomData} 
      createRoom = {makeRoom} 
      guestSearch = {guestSearch} 
      setCurrentPage = {setCurrentPage}
      />)
  }

    //OnClick for host room button
  const makeRoom = async() => {
    const movieRoomID = GenRoomID()
    const res = await Axios.post("http://localhost:3003/api/rooms/create", { name: movieRoomID });
    console.log(res.data)

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


  //use effect (same as ComponentDidMount), runs when component renders
  useEffect(() => {
    //calls the fetch rooms and changes state of roomData
    const getRooms = async() => {
      const roomsFromBackend = await fetchRooms()
      setRoomData(roomsFromBackend)
      console.log(roomData)
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
