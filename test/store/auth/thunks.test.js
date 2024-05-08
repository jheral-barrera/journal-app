import { signInWithGoogle } from "../../../src/firebase/providers"
import { checkingCredentials } from "../../../src/store/auth/authSlice";
import { checkingAuthentication } from "../../../src/store/auth/thunks"

jest.mock("../../../src/firebase/providers");

describe('Pruebas en el auth/thunks.js', () => {
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() )

    test('Llamar a la funciont checkingAuthenticacion()', async () => {

        await checkingAuthentication()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    })
})
