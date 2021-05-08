import React from 'react'
import {Button, Breadcrumb} from 'react-bootstrap'
import { ROOT_FOLDER } from '../../Hooks/useFolder'
import {Link } from 'react-router-dom'
export default function BreadCrumbs({currentFolder}) {
    
    let path = currentFolder === ROOT_FOLDER? [] : [ROOT_FOLDER]
    
    if (currentFolder) {
        path = [...path, ...currentFolder.path]
    }

    return (
       <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white p-0 m-0" }}
    >
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/dashboard",
              state: { folder: { ...folder, path: path.slice(1, index) } },
            },
          }}
          className="text-truncate d-inline-block"
          style={{ maxWidth: "150px" }}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          className="text-truncate d-inline-block"
          style={{ maxWidth: "200px" }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
    )
}
