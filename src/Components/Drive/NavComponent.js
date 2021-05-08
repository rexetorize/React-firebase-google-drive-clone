import React from 'react'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import {useAuth} from "../../Context/authContext"

export default function NavComponent() {

  const {currentUser} = useAuth()
  
    return (
           <Navbar className="d-flex" style={{justifyContent : 'space-between', height : '70px'}} bg="light" expand="sm">
      <Navbar.Brand as={Link} to="/dashboard">
        Cloud Store By REX
      </Navbar.Brand>
      <Nav className="d-flex" style={{justifyContent : 'space-between'}}>
        {currentUser && <Nav.Link as={Link} to="/update-profile">
            Profile
        </Nav.Link>}
         
      </Nav>
    </Navbar>
    )
}
