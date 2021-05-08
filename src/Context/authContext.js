import React,{useContext, useEffect, useState} from 'react'
import {auth} from '../firebase'


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged(user => {
          
        
           setCurrentUser(user)
           setLoading(false)
       })
        
        return unsubscribe;
    }, [])


    function signUp(email, password) {
       return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
         return auth.sendPasswordResetEmail(email)
    }

      function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }


    const value = {
        x: 'test',
        currentUser: currentUser,
        signUp: signUp,
        logIn: logIn,
        logOut: logout,
        resetPassword: resetPassword,
        updateEmail: updateEmail,
        updatePassword: updatePassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading  && children}
        </AuthContext.Provider>
    )
}
