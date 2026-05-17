import React, { useState } from 'react'
import { Button, ButtonGroup, Col, Container, Image, Row } from 'react-bootstrap'
import normalSeats from "../data/seats.json"
import VIPSeats from "../data/VIPSeats.json"
const BookMovie = ({ chosenMovie, setPage, setBookingInfo }) => {

    const [time, setTime] = useState(null);
    const [seat, setSeat] = useState(null)
    const [isItVIP, setIsItVIP] = useState(null)
    const [price, setPrice] = useState(0)
    const timeOptions = ["10 AM", "1 PM", "4 PM", "7 PM"];

    return (
        <Container style={{ backgroundColor: "#2849A6" }} fluid className="vh-75  "  >
            <Row className='align-items-stretch'  >
                <Col sm={4} className='rounded bg-primary m-2  d-flex flex-column' >
                    <Button variant="danger" className='m-1 align-self-start ' onClick={() => setPage('home')}>Back</Button>

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
                                    onClick={() => setBookingInfo({
                                        time: time,
                                        seat: seat,
                                        isItVIP: isItVIP
                                    })}
                                    disabled={price == 0 || time == null}>BUY</Button>
                            </Row>
                        </Container>

                    </Container>
                </Col>
            </Row>
        </Container >
    )
}

export default BookMovie