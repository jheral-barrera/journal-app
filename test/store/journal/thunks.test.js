import { collection, getDocs } from "firebase/firestore";
import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";

describe('Pruebas en el journal/thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('startNewNote debe de crear una nueva nota', async () => {
 
        const uid = 'TEST-UID';
        getState.mockReturnValue({ auth: { uid }})
        await startNewNote()( dispatch, getState );
        expect( dispatch ).toHaveBeenCalledWith( savingNewNote() ); 
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number )
        }) ); 
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            imageUrls: [],
            id: expect.any( String ),
            date: expect.any( Number )
        }) ); 
    });

})
