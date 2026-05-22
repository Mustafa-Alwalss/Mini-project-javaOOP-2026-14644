import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Image, Modal, ModalBody, Row } from 'react-bootstrap'
import normalSeats from "../data/seats.json"
import VIPSeats from "../data/VIPSeats.json"
const BookMovie = ({ chosenMovie, setPage, API_KEY }) => {

    const [genre, setGenre] = useState(null)
    const [time, setTime] = useState(null);
    const [seat, setSeat] = useState(null)
    const [isItVIP, setIsItVIP] = useState(null)
    const [price, setPrice] = useState(0)
    const timeOptions = ["10 AM", "1 PM", "4 PM", "7 PM"];

    const [booked, setBooked] = useState(false)



    // FETCHING THE GENRES OF THE MOVIE.
    useEffect(() => {
        async function fetchGenre() {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${chosenMovie.id}?api_key=${API_KEY}`
                );

                const data = await response.json();

                const genreNames = data.genres.map((genre) => genre.name);

                setGenre(genreNames);
            } catch (error) {
                console.error(error);
            }
        }

        fetchGenre();
    }, []);


    return (
        <>
            <Modal centered show={booked} onHide={() => setBooked(false)} >
                <Modal.Header>Thank You!</Modal.Header>
                <Modal.Body>The Movie Is Successfully Booked!</Modal.Body>
                <Modal.Footer><Button variant="danger" onClick={() => setBooked(false)} >Close</Button></Modal.Footer>
            </Modal>


            <Container style={{ backgroundColor: "#2849A6" }} fluid className="vh-75 rounded "  >
                <Row className='align-items-stretch'  >
                    <Col sm={4} className='rounded bg-primary m-2  d-flex flex-column' >
                        <Button variant="danger" className='m-1 align-self-start ' onClick={() => setPage('home')}>Back</Button>

                        <Row className='m-1'>
                            <Col className='bg-info rounded text-center'
                                style={{
                                    fontSize: "1.5rem"
                                }}
                            >⭐{chosenMovie.vote_average}</Col>
                        </Row>

                        <Image
                            className='rounded m-2'
                            style={{ maxHeight: "500px", objectFit: "contain" }}
                            src={`https://image.tmdb.org/t/p/w500/${chosenMovie.poster_path}`}
                        />
                        <p
                            className='p-2 rounded m-1'
                            style={{
                                backgroundColor: "#238c79",
                                maxHeight: "200px",
                                overflowY: "auto",
                            }}
                        >{chosenMovie.overview}</p>
                    </Col>

                    <Col className=' d-flex flex-column' >
                        <Container className='mt-5'>
                            <Row >
                                <Col>
                                    <ButtonGroup className='w-100 '>

                                        {timeOptions.map((x) => (
                                            <Button
                                                key={x}
                                                variant={time === x ? "success" : "outline-success"}
                                                onClick={() => setTime(x)}
                                            >{x}</Button>
                                        ))}

                                    </ButtonGroup>
                                </Col>
                            </Row>

                            <Row  >
                                <Col>
                                    <Row className='mt-5 pt-2 rounded'
                                        style={{ backgroundColor: "white" }}
                                    >
                                        {Object.entries(normalSeats).map(([rowLetter, seats]) => (
                                            <Row key={rowLetter} className="mb-2">
                                                <Col className="d-flex gap-2 align-items-center">

                                                    <strong>{rowLetter}</strong>

                                                    {seats.map((seatNumber) => (
                                                        <Button
                                                            key={`${rowLetter}-${seatNumber}`}
                                                            variant={
                                                                seat?.row === rowLetter &&
                                                                    seat?.number === seatNumber
                                                                    ? "success"
                                                                    : "outline-success"
                                                            }
                                                            onClick={() => {
                                                                setSeat({
                                                                    row: rowLetter,
                                                                    number: seatNumber,
                                                                })
                                                                setIsItVIP(false)
                                                                setPrice(50)
                                                            }
                                                            }>
                                                            {seatNumber}
                                                        </Button>
                                                    ))}
                                                </Col>
                                            </Row>
                                        ))}
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Row className='rounded pt-2 pb-2' style={{ backgroundColor: "gold" }} >
                                                <strong
                                                    style={{
                                                        fontSize: "2rem"
                                                    }}
                                                >VIP</strong>
                                                {Object.entries(VIPSeats).map(([rowLetter, seats]) => (
                                                    <Row key={rowLetter} className="mb-2">
                                                        <Col className="d-flex gap-2 align-items-center" >
                                                            <strong>{rowLetter}</strong>
                                                            {seats.map((seatNumber) => (
                                                                <Button
                                                                    key={`${rowLetter}-${seatNumber}`}
                                                                    variant={
                                                                        seat?.row === rowLetter &&
                                                                            seat?.number === seatNumber
                                                                            ? "success"
                                                                            : "outline-success"
                                                                    }
                                                                    onClick={() => {
                                                                        setSeat({
                                                                            row: rowLetter,
                                                                            number: seatNumber,
                                                                        })
                                                                        setIsItVIP(true)
                                                                        setPrice(80)
                                                                    }
                                                                    }>
                                                                    {seatNumber}
                                                                </Button>
                                                            ))}

                                                        </Col>
                                                    </Row>

                                                ))}
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Container className='mt-auto mb-3'>
                                <Row>
                                    <strong
                                        style={{
                                            fontSize: "4rem"
                                        }}
                                    >{price}</strong>
                                </Row>
                                <Row className='mt-2'>
                                    <Button
                                        onClick={() => {
                                            const bookingInfo = {
                                                movie: {
                                                    movieId: chosenMovie.id,
                                                    title: chosenMovie.title,
                                                    genre: genre,
                                                    rating: chosenMovie.vote_average,
                                                    overview: chosenMovie.overview
                                                },
                                                booking: {
                                                    seatNumber: seat.number,
                                                    seatRow: seat.row,
                                                    isItVIP: isItVIP,
                                                    time: time,
                                                    price: price
                                                }
                                            }
                                            if (window.cefQuery) {
                                                window.cefQuery({
                                                    request: JSON.stringify(bookingInfo),
                                                    onSuccess: (response) => {
                                                        setBooked(true)
                                                    },
                                                    onFailure: (code, msg) => {
                                                        console.error(code, msg)
                                                    }
                                                })
                                            }
                                        }}
                                        disabled={price == 0 || time == null}>BUY</Button>
                                </Row>
                            </Container>

                        </Container>
                    </Col>
                </Row >
            </Container >
        </>
    )
}

export default BookMovie
