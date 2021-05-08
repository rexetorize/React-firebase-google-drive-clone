
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useAuth } from "../../Context/authContext"
import { database, storage } from "../../firebase"
import { ROOT_FOLDER } from "../../Hooks/useFolder"
import { v4 as uuidV4 } from "uuid"
import { ProgressBar, Toast } from "react-bootstrap"


export default function AddFilesBtn({ currentFolder }) {
  const [uploadingFiles, setUploadingFiles] = useState([])
  const {currentUser} = useAuth();
 
function handleUpload(e) {
  const file = e.target.files[0]

  const id = uuidV4()
    setUploadingFiles(prevUploadingFiles => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ])
  
  if (currentFolder == null || file == null) return;
  let tempPath = ''

  function test() {
    currentFolder.path.forEach(p => {
      return tempPath = tempPath === '' ? p.name : tempPath + '/' + p.name;
    })
  }
  test();

      const filePath =
      currentFolder === ROOT_FOLDER
        ? `/${file.name}`
        : `${tempPath}/${currentFolder.name}/${file.name}`

   const uploadTask = storage.ref(`files/${currentUser.uid}/${filePath}`).put(file)

  uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = snapshot.bytesTransferred / snapshot.totalBytes
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress }
            }

            return uploadFile
          })
        })
      },
      () => {
        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.map(uploadFile => {
            if (uploadFile.id === id) {
              return { ...uploadFile, error: true }
            }
            return uploadFile
          })
        })},


    () => {

        setUploadingFiles(prevUploadingFiles => {
          return prevUploadingFiles.filter(uploadFile => {
            return uploadFile.id !== id
          })
        })
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => { 
      
        database.files.add({
          url:downloadURL,
          name: file.name,
          createdAt: database.getCurrentTimeStamp(),
          folderId: currentFolder.id,
          userId: currentUser.uid
        })
    })}
  )
}

  return (
      
    <>
         <label className="btn btn-outline-success btn-lg m-0 mr-2">
        <FontAwesomeIcon icon={faFileUpload} />
        <input
          type="file"
          onChange={handleUpload}
          style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        />
      </label>
      {uploadingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "250px",
            }}
          >
            {uploadingFiles.map(file => (
              <Toast
                key={file.id}
                onClose={() => {
                  setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadFile => {
                      return uploadFile.id !== file.id
                    })
                  })
                }}
              >
                <Toast.Header
                  closeButton={file.error}
                  className="text-truncate w-100 d-block"
                >
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.error}
                    variant={file.error ? "danger" : "warning"}
                    now={file.error ? 100 : file.progress * 100}
                    label={
                      file.error
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
    )
}
