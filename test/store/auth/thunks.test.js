import { Password } from "@mui/icons-material";
import { loginWithEmail, logoutFirebase, registerUserWithEmail, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startCreatingUserWithEmail, startGoogleSignIn, startLoginWithEmail, startLogoutFirebase } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";

jest.mock("../../../src/firebase/providers");

describe('Pruebas en el auth/thunks.js', () => {
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() )

    test('Llamar a la funcion checkingAuthenticacion()', async () => {

        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    })

    test('startGoogleSignIn debe llamar a checkingCredentials y login - Exito', async () => {
        const loginData = { authResult: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    })

    test('startGoogleSignIn debe llamar a checkingCredentials y login - Error', async () => {
        const loginData = { authResult: false, errorMessage: 'Error de autenticación con Google' };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    })

    test('startCreatingUserWithEmail debe llamar a checkingCredentials y login - Exito', async () => {
        const loginData = { authResult: true, ...demoUser };
        const formData = { displayName: loginData.displayName, email: loginData.email, password: '123456' };
        await registerUserWithEmail.mockResolvedValue( loginData );

        await startCreatingUserWithEmail( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    })

    test('startCreatingUserWithEmail debe llamar a checkingCredentials y logout - Error', async () => {
        const loginData = { authResult: false, errorMessage: 'No se pudo crear el usuario correctamente' };
        await registerUserWithEmail.mockResolvedValue( loginData );

        await startCreatingUserWithEmail( loginData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    })

    test('startLoginWithEmail debe llamar a checkingCredentials y login - Exito', async () => {
        const loginData = { authResult: true, ...demoUser };
        const formData = { email: loginData.email, password: '123456' };
        await loginWithEmail.mockResolvedValue( loginData );

        await startLoginWithEmail( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    })

    test('startLoginWithEmail debe llamar a checkingCredentials y logout - Error', async () => {
        const loginData = { authResult: false, error: 'Error al iniciar la sesion' };
        await loginWithEmail.mockResolvedValue( loginData );

        await startLoginWithEmail( loginData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    })

    test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogoutFirebase()( dispatch );

        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    })
})
