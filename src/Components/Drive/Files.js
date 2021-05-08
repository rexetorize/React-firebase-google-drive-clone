import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"

export default function File({ file }) {
  return (
    <a
      href={file.url}
      target="_blank"
      className="d-flex align-items-center justify-content-center btn btn-outline-dark text-truncate w-100 ml-2 mb-2 " 
      
      style={{maxWidth : "250px"}}
    >
      <FontAwesomeIcon icon={faFile} className="mr-2" />
     {file.name}
    </a>
  )
}