import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

