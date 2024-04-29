import { collection, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { getNotes } from "../../helpers";

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
        await setDoc( newDocument, newNote );

        // agregamos el campo id a nuestro objeto nota
        // para agregarlo al state
        newNote.id = newDocument.id;

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
    }
}

export const startGetNotes  = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        if ( !uid ) throw new Error('User UID does not exist');

        const notes = await getNotes({ uid });

        dispatch( setNotes({ notes }))
    }
}

export const startUpdateNotes = () => {
    return async ( dispatch, getState ) => {
        dispatch( setSaving() );

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const documentRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc( documentRef, noteToFireStore, { merge: true } );

        dispatch( updateNote({ note }))
    }
}

