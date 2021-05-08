import React, { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons"
import { database } from "../../firebase"
import {useAuth} from "../../Context/authContext"
import {ROOT_FOLDER} from "../../Hooks/useFolder"

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [error, setError] = useState('');
    const [ loading, setLoading] = useState(false)
const {currentUser} = useAuth()
    function handleSubmit(e) {
        e.preventDefault()
      if (currentFolder === null) return;


      const path = [...currentFolder.path]
      if (currentFolder !== ROOT_FOLDER) {
        path.push({name: currentFolder.name, id: currentFolder.id})
      }
        
            database.folders.add({
              name: name,
              parentId : currentFolder.id,
              userId : currentUser.uid,
              path:path, 
              createdAt : database.getCurrentTimeStamp()
            })
            
    
        setName("")
        setOpen(false)
    }


  function openModal() {
    setOpen(true)
  }

  function closeModal() {
    setOpen(false)
  }

 
  return (
      <>
         
      <Button onClick={openModal} variant="outline-warning" size="lg">
        <FontAwesomeIcon icon={faFolderPlus} />
      </Button>
          <Modal show={open} onHide={closeModal}>
              <Form onSubmit={handleSubmit}>
                  <Modal.Body>
                      <Form.Group>
                          <Form.Label>Folder Name</Form.Label>
                          <Form.Control
                              onChange={(e) => { setName(e.target.value) }}
                              type="text"
                              value={name}
                              required
                          />
                      </Form.Group>
                    </Modal.Body>
                  <Modal.Footer>
                      <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
                      <Button  variant="success" type="submit">
              Add Folder
            </Button>
              </Modal.Footer>
              </Form>
              </Modal>
    </>
  )
}