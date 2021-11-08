import initFirebase from "../Pages/Login/firebase/firebase.init";
import {useEffect, useState} from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getIdToken, updateProfile, signOut } from "firebase/auth";


initFirebase();

const useFirebase = () =>{
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();



    const registerUser = (email, password, name, history) =>{
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setAuthError('');
            const newUser = {email, displayName: name};
            setUser(newUser);
            saveUser(email, name, 'POST');
            updateProfile(auth.currentUser, {
              displayName: name
            }).then(() => {
            }).catch((error) => {
            });
            
            history.replace('/');
          })
          .catch((error) => {
            setAuthError(error.message);
          })
          .finally( () => setIsLoading(false));
    }


    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const destination = location?.state?.from || '/';
            history.replace(destination);
            setAuthError('');
        })
        .catch((error) => {
            setAuthError(error.message);
        })
        .finally( () => setIsLoading(false));

    }



    // google login

    const signInUsingGoogle = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        saveUser(user.email, user.displayName, 'PUT')
        setAuthError('');
        const destination = location?.state?.from || '/';
        history.replace(destination);
      }).catch((error) => {
        setAuthError(error.message);
      })
      .finally( () => setIsLoading(false));
    }



    useEffect( () =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user);
              getIdToken(user)
              .then(idToken =>{
                setToken(idToken);
              })
            } else {
              setUser({});
            }
            setIsLoading(false);
          });
          return () => unsubscribe;
    },[])


    useEffect( () => {
      fetch(`https://aqueous-gorge-58617.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
    },[user.email])


    const logOut = () =>{
        setIsLoading(true);
        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          .finally( () => setIsLoading(false));
    }

    const saveUser = (email, displayName, method) => {
      const user = {email, displayName};
      fetch('https://aqueous-gorge-58617.herokuapp.com/users', {
        method: method,
        headers: {
          'content-type':'application/json'
        },
        body: JSON.stringify(user)
      })
    }

    return{
        user,
        admin,
        isLoading,
        authError,
        token,
        registerUser,
        loginUser,
        signInUsingGoogle,
        logOut,
    }
};

export default useFirebase;