import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const app = firebase.initializeApp({
    apiKey:process.env.REACT_APP_FIREBASE_APIKEY ,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN ,
    databaseURL:process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
})


export default app;

export const auth = app.auth()
export const storage = app.storage(); 
const firestore = app.firestore();
export const database = {
     formatDoc: doc => {
    return { id: doc.id, ...doc.data() }
  },
    folders: firestore.collection('folders'),
    files: firestore.collection('files'),
    getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp
}
