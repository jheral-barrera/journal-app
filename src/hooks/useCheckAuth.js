import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth";
import { FirebaseAuth } from "../firebase/config";
import { startGetNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();

      // * mantener el estado de la autenticacion
    useEffect(() => {
        onAuthStateChanged( FirebaseAuth, async ( user ) => {
          if ( !user ) return dispatch( logout()  );

          const { uid, displayName, email, photoURL } = user;

          dispatch( login({ uid, displayName, email, photoURL }) );
          dispatch( startGetNotes() );
        } );
    }, []);

  return status;
}
