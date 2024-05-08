import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice"
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('Pruebas en el authSlice', () => {
    test('Retornar el estado inicial y llamarse "auth"', () => {
        const nameAuthSlice = 'auth';
        const state = authSlice.reducer( initialState, {} );

        expect( authSlice.name ).toBe( nameAuthSlice );
        expect( state ).toEqual( initialState );
    })

    test('Realizar la autenticacion', () => {
        const state = authSlice.reducer( initialState, login( demoUser ) );

        expect( state ).toEqual( authenticatedState );
    })

    test('Realizar el logout sin argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout( null ) );

        expect( state ).toEqual( notAuthenticatedState );
    })

    test('Realizar el logout con argumentos', () => {
        const errorMessage = 'Las credenciales de acceso no son las correctas.'
        const state = authSlice.reducer( authenticatedState, logout( errorMessage ) );

        const notAuthenticatedStateWithArguments = {
            status: 'not-authenticated',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        }

        expect( state ).toEqual( notAuthenticatedStateWithArguments );
    })

    test('Cambiar el stado a "checking"', () => {
        const state = authSlice.reducer( notAuthenticatedState, checkingCredentials() );

        expect( state ).toEqual( initialState );
    })
})
