import React, {useState, useRef} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import {useAuth} from '../../Context/authContext'
import CenteredContainer from './CenteredContainer'

export default function UpdateProfile() {
    
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {updateEmail, updatePassword, currentUser, logOut} = useAuth()  
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory();
  



     function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleLogout = () => {
    try {
       logOut();
      history.push("/")  
    }
    catch (err) {
      console.log(err);
      setError("Failed to log out")
}
  }

    return (
        <CenteredContainer>
                  <Card>
        <Card.Body>
            <h2 className="text-center mb-4">Update ur profile here ;D</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef}  required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordRef} value="" />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordConfirmRef}  />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {loading ? "Loading..." : "Update account"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        To dasboard! <Link to="/dashboard">Dashboard</Link>
        </div>
        <Button disabled={loading} onClick={handleLogout}
           variant="danger" className="w-100 mt-5" type="submit">
          Logout
            </Button>
        
        <p className="w-100 text-center mt-5 " style={{fontSize: "20px"}}>Created and Managed by @rexetorize</p>
        </CenteredContainer>
    )
}
