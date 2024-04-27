import { useDispatch, useSelector } from "react-redux"
import { startCreatingUserWithEmail } from "../../store/auth/thunks"

import { Link as RouterLink } from 'react-router-dom'

import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { useMemo, useState } from "react"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"

const formNames = {
  displayName: 'displayName',
  email: 'email',
  password: 'password'
}

const formData = {
  displayName: '',
  email: '',
  password: ''
}

const formsValidations = {
  displayName: [ (value) => value.length >= 1, 'The name is required'],
  email: [ (value) => value.includes('@'), 'The email must be contain an @'],
  password: [ (value) => value.length >= 6, 'The password must be at least 6']
}

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const { status, errorMessage } = useSelector( state => state.auth );

  const isAutenthicating = useMemo( () => status === 'checking', [ status ] );

  const { 
    displayName, email, password, handleInputForm, formState,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm({ initialForm: formData, formsValidations });

  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( startCreatingUserWithEmail(formState) );

  }

  return (
    <AuthLayout title='Register'>

      <form 
        onSubmit={ onSubmit }
      >

        <Grid container>

          {/* Grid de inputs */}
          <Grid item xs={ 12 }>
            <TextField 
              name={ formNames.displayName }
              label="Full Name" 
              type="text" 
              placeholder="Jheral Barrera" 
              fullWidth
              sx={{ marginTop: 2}}
              onChange={ handleInputForm }
              value={ displayName }
              error={ !!displayNameValid && formSubmitted }
              helperText={ formSubmitted ? displayNameValid : null }
            />
            <TextField
              name={ formNames.email } 
              label="E-mail" 
              type="email" 
              placeholder="Example@mail.com" 
              fullWidth
              sx={{ marginTop: 2}}
              onChange={ handleInputForm }
              value={ email }
              error={ !!emailValid && formSubmitted }
              helperText={ formSubmitted ? emailValid : null }
            />
            <TextField 
              name={ formNames.password }
              label="Password" 
              type="password" 
              placeholder="Password" 
              fullWidth
              sx={{ marginTop: 2}}
              onChange={ handleInputForm }
              value={ password }
              error={ !!passwordValid && formSubmitted }
              helperText={ formSubmitted ? passwordValid : null }
            />
          </Grid>
          {/* Grid de inputs */}

          {/* Grid de alertas */}
          <Grid 
            item xs={ 12 } 
            sx={{ marginTop: 2 }}
            display={ errorMessage ? '' : 'none' }
          >
            <Alert severity="error">{ errorMessage }</Alert>
          </Grid>
          {/* Grid de alertas */}

          {/* Grid de botones */}
          <Grid container spacing={ 2 } sx={{ marginY: 1 }}>
            <Grid item xs={ 12 } md={ 12 } textAlign='center'>
              <Button 
                disabled={ isAutenthicating }
                variant="contained" 
                fullWidth
                type="submit"
              >
                <Typography variant="button">Create Account</Typography>
              </Button>
            </Grid>
          </Grid> 
          {/* Grid de botones */}

          {/* Grid de redireccion */}
          <Grid 
            container
            direction='row'
            justifyContent='center'
            sx={{ marginTop: 1 }}
          >
            <Typography>
              if you don't have an account,{' '} 
              <Link
                component={ RouterLink }
                color='inherit' 
                to="/auth/login"
                >
                log in here
              </Link>
            </Typography>
          </Grid>
          {/* Grid de redireccion */}
        </Grid>
      </form>
    </AuthLayout>
  )
}
