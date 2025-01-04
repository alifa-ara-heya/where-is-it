import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    // sign in with google
    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    //registration
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = updatedData => {
        return updateProfile(auth.currentUser, updatedData);
    }

    //sign in existing user
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // sign out user
    const signOutUser = () => {
        setLoading(true);
        toast.success('Signed Out.')
        return signOut(auth);
    }

    const authInfo = {
        signInWithGoogle,
        createUser,
        loading,
        signInUser,
        user,
        signOutUser,
        setUser,
        updateUserProfile
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log('current user', currentUser);

            // jwt
            if (currentUser?.email) {
                const user = { email: currentUser.email }

                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log('login token', res.data)
                        setLoading(false)
                    })
                    .catch(err => console.log('error generating token', err))
            }

            //when the user logs out, remove the token
            else {
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, {}, {
                    withCredentials: true,
                })
                    .then(res => {
                        console.log('logout', res.data);
                        setLoading(false);
                    })
            }

        })
        return () => {
            unSubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;