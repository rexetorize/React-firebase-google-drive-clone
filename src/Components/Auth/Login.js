import React, {useState, useRef} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import { Link, useHistory} from 'react-router-dom'
import {useAuth} from '../../Context/authContext'
import CenteredContainer from './CenteredContainer'

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();

    const {logIn} = useAuth()  
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    
  
    async function handleSubmit(e) {
      e.preventDefault()

     
     
        try {
        setError("")
        setLoading(true)
            await logIn(emailRef.current.value, passwordRef.current.value)
            history.push('/dashboard')
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
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
           
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              {loading ? "Loading..." : "Login"}
            </Button>
            </Form>
            
          <div className="text-center w-100 mt-2"> <Link to="/password-reset" >Forgot Password</Link></div> 
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
        </CenteredContainer>
    )
}
