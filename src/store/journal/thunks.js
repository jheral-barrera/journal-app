import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { getNotes } from "../../helpers";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async ( dispatch, getState ) => {
        dispatch( savingNewNote() )

        const { uid } = getState().auth;


        const newNote = {
            title: '',
            body: '',
            imagesUrls: [],
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

export const startUploadingFiles = ( files = [] ) => { 
    return async ( dispatch, getState ) => {
        dispatch( setSaving() );

        // await fileUpload( files[0] );
        // Se guardara todas las promesas de subida de imagenes en una lista
        const fileUploadPromises = [];
        for ( const file of files ) {
            fileUploadPromises.push( fileUpload(file) );
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        
        dispatch( setPhotosToActiveNote( photosUrls ) );
    }
}

export const startDeletingNote = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const documentRef = doc( FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc( documentRef );

        dispatch( deleteNoteById( note.id ));
    }
}

