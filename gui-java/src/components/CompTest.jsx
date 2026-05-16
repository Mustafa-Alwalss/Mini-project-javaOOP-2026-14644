import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'

function CompTest() {
    const [toJava, setToJava] = useState("")
    const [fromJava, setFromJava] = useState("")

    const sendToJava = () => {
        if (window.cefQuery) {
            window.cefQuery({
                request: toJava,          // the message sent to Java
                onSuccess: (response) => { // Java called callback.success(...)
                    setFromJava(response)
                },
                onFailure: (code, msg) => { // Java called callback.failure(...)
                    console.error("Java error:", code, msg)
                }
            })
        } else {
            console.warn("cefQuery not available — not running inside JCEF")
        }
    }

    return (
        <Container>
            <div className='bg-danger'>
                <input
                    type="text"
                    value={toJava}
                    onChange={(e) => setToJava(e.target.value)}
                />
                <Button onClick={sendToJava} variant="primary">
                    Send to Java
                </Button>
                {fromJava && <p>{fromJava}</p>}
            </div>
        </Container>
    )
}

export default CompTest