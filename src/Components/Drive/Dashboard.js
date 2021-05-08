import React from 'react'
import { Card, Alert, Button,Container } from 'react-bootstrap'
import {Link, useParams }from 'react-router-dom'
import {useAuth} from '../../Context/authContext'
import {useFolder} from '../../Hooks/useFolder'
import NavComponent from './NavComponent'
import AddFldrBtn from './AddFldrBtn'
import ChildFolder from './ChildFolder'
import BreadCrumbs from './BreadCrumbs'
import AddFilesBtn from './AddFilesBtn'
import Files from './Files'

export default function Dashboard() {

    const {currentUser, logOut} = useAuth()
    const [error, setError] = React.useState()
    const { folderId } = useParams()
    const {folder, childFolders, childFiles}= useFolder(folderId)


    
    return (
        <Container className="mt-3" fluid>
        <div className="d-flex align-items-center">
          <BreadCrumbs currentFolder={folder} />
          <AddFilesBtn currentFolder={folder}/>
          <AddFldrBtn currentFolder={folder} />
        </div>
        {childFolders? null : <p>Loading...</p>}
        {childFolders.length > 0 && (
          <div className="mt-3 d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div
                key={childFolder.id}
                style={{ maxWidth: "250px" }}
                className="p-2"
              >
                <ChildFolder folder={childFolder} />
              </div>
            ))}
          </div>
        )}
        { childFiles.length > 0 ? <hr></hr> : null}
        <div className="mt-6 d-flex flex-wrap">
             
          {childFiles.length === 0 ? <p>Upload a picture or pdf doc :D</p> : null}
            
          {childFiles.map(file => {
          
              return <Files file={file}/>
            })}</div>
        </Container>
    )
}
