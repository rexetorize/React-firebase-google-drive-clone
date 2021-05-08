import React, {useState, useRef} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import {useAuth} from '../../Context/authContext'
import CenteredContainer from './CenteredContainer'

export default function PasswordReset() {

    const emailRef = useRef();
    const {resetPassword} = useAuth()  
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
      e.preventDefault()

     
     
        try {
        setError("")
        setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("A mail has been sent to the above Email id please check 😀🍟")
      } catch (err) {
        console.log("ERR"+err)
        setError((err.message))
      }

      setLoading(false)
    }



    return (
        <CenteredContainer>
                  <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
           
            <Button disabled={loading} className="w-100" type="submit">
              {loading ? "Loading..." : "Reset Password"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Sign in here! <Link to="/">Log In</Link>
      </div>
        </CenteredContainer>
    )
}
