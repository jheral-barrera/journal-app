import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

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
        const res = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = res.user;

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

