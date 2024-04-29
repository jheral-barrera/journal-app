import { collection, getDocs } from "firebase/firestore";
import { FirebaseDB } from "../firebase/config";

export const getNotes = async ({ uid = '' }) => {
    if ( !uid ) throw new Error('User UID does not exist');

    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes` );
    const documents = await getDocs( collectionRef );

    const notes = [];

    documents.forEach( (doc) => {
        notes.push( {
            id: doc.id,
            ...doc.data(),
        } )
    } )

    return notes;
}
