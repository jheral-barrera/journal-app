import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        dispatch( savingNewNote() )

        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDocument = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        const result = await setDoc( newDocument, newNote );

        // agregamos el campo id a nuestro objeto nota
        // para agregarlo al state
        newNote.id = newDocument.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

