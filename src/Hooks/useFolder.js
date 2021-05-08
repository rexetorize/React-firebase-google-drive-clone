import React,{useReducer} from 'react'
import { useAuth } from "../Context/authContext"
import { database } from "../firebase"
 const ACTIONS = {
        SELECT_FOLDER: "select-folder",
        UPDATE_FOLDER: "update-folder",
        UPDATE_CHILD_FOLDERS: "update-child-folder",
        SET_CHILD_FILES : "set-child-files",
        }
 export const ROOT_FOLDER = { name: "Root", id: null, path: [] }
 


export function useFolder(folderId = null, folder=null)
{
    
   
   const { currentUser } = useAuth();
   


    function reducer(state, {type, payload}) {
        
        switch (type) {
            case ACTIONS.SELECT_FOLDER:
                return {

                    folderId: payload.folderId, 
                    folder: payload.folder,
                    childFolders: [],
                    childFiles : []
                }
            case ACTIONS.UPDATE_FOLDER:
                return {
                    ...state,
                    folder: payload.folder
                }
            case ACTIONS.UPDATE_CHILD_FOLDERS:
                return {
                    ...state,
                    childFolders: payload.childFolders
                }
            
            case ACTIONS.SET_CHILD_FILES:
                return {
                    ...state,
                    childFiles: payload.childFiles
                }
            default:
      return state
        }
    }
    

    const [state, dispatch ] = useReducer(reducer, {folderId, folder, childFolders : [], childFiles:[] })

    React.useEffect(() => { 
        dispatch({type : ACTIONS.SELECT_FOLDER, payload: {folderId, folder}})
    }, [folderId, folder])
    

    React.useEffect(() => {
        if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      })
    }
            database.folders.doc(folderId).get().then(doc => {
                const obj = { id: doc.id, ...doc.data() }
                dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: obj },
        })
            }).catch(() => {
                console.log("DIS FIRED")
                dispatch({
                type : ACTIONS.UPDATE_FOLDER, payload : {folder : ROOT_FOLDER}
            })})
            
    }, [folderId])

    React.useEffect(() => {
        return database.folders.where("parentId", "==", folderId).where("userId", "==", currentUser.uid).orderBy("createdAt").onSnapshot(snapshot => {
           dispatch({
            type: ACTIONS.UPDATE_CHILD_FOLDERS,
            payload: { childFolders: snapshot.docs.map(database.formatDoc) },
          })
        })
    }, [folderId, currentUser])

   React.useEffect(() => {
    return (
      database.files
        .where("folderId", "==", folderId)
        .where("userId", "==", currentUser.uid)
        // .orderBy("createdAt")
        .onSnapshot(snapshot => {
          dispatch({
            type: ACTIONS.SET_CHILD_FILES,
            payload: { childFiles: snapshot.docs.map(database.formatDoc) },
          })
        })
    )
  }, [folderId, currentUser])
    return state;
}