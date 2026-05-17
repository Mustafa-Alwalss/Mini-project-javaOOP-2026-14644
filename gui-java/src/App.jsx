import React, { useEffect, useState } from 'react'
import './App.css'
import CompTest from './components/CompTest';
import HomePage from './components/HomePage';
import { Container, Image } from 'react-bootstrap';

import MOVIE_LIST from "./data/movies.json"
import BookMovie from './components/BookMovie';


function App() {

  const [movies, setMovies] = useState([])
  const [chosenMovie, setChosenMovie] = useState()
  const [page, setPage] = useState('home')

  const [bookingInfo, setBookingInfo] = useState({
    time: null,
    seat: null,
    isItVIP: false,
  })
  console.log(bookingInfo)
  const API_KEY = import.meta.env.VITE_API;
  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Promise.all(
        MOVIE_LIST.map(async (name) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}`
          )
          const data = await response.json()

          return data.results[0]
        })
      )

      setMovies(movieData)
    }
    fetchMovies()
  }, [])


  return (
    <>

      <Container style={{ width: "100%" }} className='d-flex justify-content-center  mb-3 ' >
        <Image style={{ height: "90px" }} src="/Background.png" />
      </Container>
      <Container>

        {page === 'home' && movies.length > 0 && (<HomePage movies={movies} setPage={setPage} setChosenMovie={setChosenMovie} />)}
        {page === 'booking' && movies.length > 0 && (<BookMovie chosenMovie={chosenMovie} setPage={setPage} setBookingInfo={setBookingInfo} />)}
      </Container>

    </>
  )
}

export default App
