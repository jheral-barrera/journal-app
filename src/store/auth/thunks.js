import { registerUserWithEmail, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();

        if ( !result.authResult ) return dispatch( logout( result.errorMessage ) );
        
        dispatch( login( result ) );
    }
}

export const startCreatingUserWithEmail = ({ displayName, email, password }) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmail({ displayName, email, password });
    
        if ( !result.authResult ) return dispatch( logout( result.errorMessage ))

        dispatch( login( result ) );
    }
}

