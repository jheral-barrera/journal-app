import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseApp, FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup( FirebaseAuth, googleProvider );
        // provee token y demas
        // const credentials = GoogleAuthProvider.credentialFromResult( result );

        const { displayName, email, photoURL, uid } = result.user;      

        return {
            authResult: true,
            displayName,
            email,
            photoURL,
            uid 
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            authResult: false,
            errorCode,
            errorMessage
        }
    }
    
}

export const registerUserWithEmail = async ({ displayName, email, password }) => {
    try {
        const result = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = result.user;

        // Actualizar el nombre del usuario 
        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            authResult: true,
            displayName,
            email,
            photoURL,
            uid 
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            authResult: false,
            errorCode,
            errorMessage
        }
    }
}

export const loginWithEmail = async ({ email, password }) => {
    try {
        // * SOLUCION IMPLEMENTADA POR MI - ESTARA BUENO? NI IDEA
        // const auth = getAuth( FirebaseApp );
        // const { displayName, email, photoURL, uid } = auth.currentUser;
        // console.log(auth);
        // console.log(auth.currentUser)
        
        const result = await signInWithEmailAndPassword( FirebaseAuth, email, password );
        const { displayName, photoURL, uid } = result.user;

        return {
            authResult: true,
            displayName,
            email,
            photoURL,
            uid 
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            authResult: false,
            errorCode,
            errorMessage
        }
    }

}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}

