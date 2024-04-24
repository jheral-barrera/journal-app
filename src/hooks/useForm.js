import { useEffect, useState } from "react"

export const useForm = ({ initialForm = {}, formsValidations = {} }) => {
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( {} );

    useEffect(() => {
        createValidators();
    }, [ formState ])

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
        const formCheckValues = {};

        for (const formField of Object.keys( formsValidations )) {
            const [ validate, errorMessage ] = formsValidations[ formField ];

            formCheckValues[`${ formField }Valid`] = validate( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckValues );
    }
  
    return {
        ...formState,
        handleInputForm,
        handleResetForm,

        ...formValidation
  }
}
