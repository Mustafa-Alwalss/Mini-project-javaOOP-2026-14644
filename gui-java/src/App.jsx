import React, { useEffect, useState } from 'react'
import './App.css'
import CompTest from './components/CompTest';
import HomePage from './components/HomePage';
import { Container, Image } from 'react-bootstrap';

import MOVIE_LIST from "./movies.json"


function App() {

  const [movies, setMovies] = useState([])

  const API_KEY = import.meta.env.VITE_API;

  console.log(API_KEY)
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
      <span style={{
        width: "100%"
      }} >
        <Image
          style={{
            height: "90px"
          }}
          src="/Background.png" />
      </span>
      <Container>
        <HomePage movies={movies} />
      </Container>
    </>
  )
}

export default App
