import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
    },
    reducers: {
        addNewEmptyNote: ( state, { payload } ) => {
            state.notes.push( payload );
            state.isSaving = false;
        },
        updateNote: ( state, { payload } ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                if ( note.id === payload.note.id ) return payload.note;

                return { ...note }
            } )

            state.messageSaved = `Nota actualizada correctamente :)`;
        },
        deleteNote: ( state, { payload } ) => {

        },
        setActiveNote: ( state, { payload } ) => {
            state.active = payload;
            state.messageSaved = '';
        },
        setNotes: ( state, { payload } ) => {
            state.notes = payload.notes;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        setPhotosToActiveNote: ( state, { payload } ) => {
            state.active.imagesUrls = [ ...state.active.imagesUrls, ...payload ];
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    addNewEmptyNote,
    updateNote,
    deleteNote, 
    setActiveNote,
    setNotes,
    setSaving,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout
} = journalSlice.actions;