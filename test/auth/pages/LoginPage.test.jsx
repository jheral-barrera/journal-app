import { fireEvent, render, screen } from "@testing-library/react"
import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { configureStore } from "@reduxjs/toolkit"
import { MemoryRouter } from "react-router-dom";
import { Provider, useDispatch } from "react-redux"
import { authSlice } from "../../../src/store/auth";
import { startGoogleSignIn, startLoginWithEmail } from "../../../src/store/auth/thunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmail = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmail: ({ email, password }) => () => mockStartLoginWithEmail({ email, password })
}))

// para mockear cualquier libreria
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => ( fn ) => fn()
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en el LoginPage', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Renderizar el componente correctamente', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

        // screen.debug();
    })

    test('Boton de google debe llamar a la funcion startGoogleSignIn', () => {

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        const button = screen.getByLabelText('googleButton');
        fireEvent.click( button );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    })

    test('Submit debe llamar al startLoginWithEmail', () => {
        const email = 'jheral@google.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        )

        // buscamos por la propiedad 'label' del input
        const emailInput = screen.getByRole('textbox', { name: 'E-mail' });
        fireEvent.change( emailInput, { target: { name: 'email', value: email } } );

        const passwordInput = screen.getByTestId('password');
        fireEvent.change( passwordInput, { target: { name: 'password', value: password } } );

        const loginForm = screen.getByLabelText('loginForm');
        fireEvent.submit( loginForm );

        expect( mockStartLoginWithEmail ).toHaveBeenCalledWith({ email, password });
        // screen.debug();
    })
})

