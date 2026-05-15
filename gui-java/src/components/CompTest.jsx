import React from 'react'
import { Button, Container } from 'react-bootstrap'

function CompTest() {

    const [Tojava, setTojava] = useState("")
    const [fromJava, setfromJava] = useState("")

    return (
        <Container >
            <div className='bg-danger'>
                <input type="text" />
                <Button variant="primary" >asdsad</Button>

                {fromJavaf && <p>{fromJava}</p>}

            </div>
        </Container>)
}

export default CompTest