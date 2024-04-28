import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: { 
        //     id: '123', <-- id dado por firebase
        //     title: '',
        //     body: '',
        //     date: '12/12/24',
        //     imageUrls: [] <-- https://foto1.jpg, https://foto2.jpg
        // }
    },
    reducers: {
        addNewEmptyNote: ( state, { payload } ) => {
            state.notes.push( payload );
            state.isSaving = false;
        },
        updateNote: ( state, { payload } ) => {

        },
        deleteNote: ( state, { payload } ) => {

        },
        setActiveNote: ( state, { payload } ) => {
            state.active = payload;
        },
        setNotes: ( state, { payload } ) => {

        },
        setSaving: ( state, { payload } ) => {
            state.isSaving = true;
        },
        savingNewNote: ( state ) => {
            state.isSaving = true;
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
    savingNewNote
} = journalSlice.actions;