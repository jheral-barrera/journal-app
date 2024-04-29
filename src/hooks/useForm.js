import { useEffect, useMemo, useState } from "react"

export const useForm = ({ initialForm = {}, formsValidations = {} }) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect(() => {
        createValidators();
    }, [ formState ])
    
    useEffect(() => {
        setFormState( initialForm, formValidation );
    }, [ initialForm ])

    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ]);

    const handleInputForm = ({ target }) => {
        const { name, value = '' } = target;

        setFormState({
            ...formState,
            [ name ]: value,
        });
    }

    const handleResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        const formCheckValues = {}; // Para almacenar los valores de la validacion

        // Recorremos los keys del prop que contiene las validaciones {key: value}
        for (const formField of Object.keys( formsValidations )) {
            // desectructuramos el prop recibido ( la funcion y el mensaje de error )
            // de acuerdo a la key que le pasamos
            const [ validate, errorMessage ] = formsValidations[ formField ];

            // agregamos al formCheck un nuevo valor con la key de los formField (email, password, etc)
            // pero se le agrega el 'Valid' ejecutando la 'funcion' que desectructuramos
            formCheckValues[`${ formField }Valid`] = validate( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckValues );
    }

    // console.log( formState )
      
    return {
        ...formState,
        formState,
        handleInputForm,
        handleResetForm,

        ...formValidation,
        isFormValid,
  }
}
