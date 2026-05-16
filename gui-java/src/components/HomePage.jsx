import React from 'react'
import "../App.css"
import { Button, Card, Container, Row } from 'react-bootstrap'
const HomePage = ({ movies }) => {

    return (

        <Container className=''>
            <Row>
                {movies.map(movie => (
                    <Card
                        className='p-2 m-3 d-flex flex-column'
                        style={{
                            width: '18rem',
                            backgroundColor: "#2849A6"
                        }}
                        key={movie.id}
                    >
                        <Card.Img
                            variant="top"
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            className='mb-2'
                        />
                        <Card.Body
                            className='m-1 d-flex flex-column bg-primary rounded text-white'
                        >
                            <Card.Title>{movie.title}</Card.Title>
                            <Card.Text
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 4,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {movie.overview}
                            </Card.Text>
                            <Button className='mt-auto bg-danger' >Buy Ticket</Button>
                        </Card.Body>
                    </Card>
                ))}

            </Row>
        </Container >

    )
}

export default HomePage