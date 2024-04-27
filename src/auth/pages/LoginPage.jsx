import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from 'react-router-dom'
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"

import { AuthLayout } from "../layout/AuthLayout"

import { useForm } from '../../hooks'
import { startGoogleSignIn, startLoginWithEmail } from "../../store/auth"

const formNames = {
  email: 'email',
  password: 'password'
}

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  // obtenemos el status(autenticado, no autenticado, chequeando)
  // almacenado en el stado del redux auth
  const { status, errorMessage } = useSelector( state => state.auth );

  // creamos el dispatch para accionar las funciones de authSlice o thunks
  const dispatch = useDispatch();

  // usamos nuestro custom hooks para manejar el formulario
  const { email, password, handleInputForm } = useForm({ initialForm: formData });

  // funcion que devuelte 'true' o 'false' para habilitar o desabilitar los botones
  const isAutenthicating = useMemo( () => status === 'checking', [ status ] );

  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmail({ email, password }));
  }
  
  // funcion para comenzar con la authenticacion por google
  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() );
  }

  return (
    <AuthLayout title='Login'>

      <form onSubmit={ onSubmit }>

        <Grid container>

          {/* Grid de inputs */}
          <Grid item xs={ 12 }>
            <TextField 
              name={ formNames.email }
              label="E-mail" 
              type="email" 
              placeholder="Example@mail.com" 
              fullWidth
              sx={{ marginTop: 2}}
              onChange={ handleInputForm }
              value={ email }
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
            />
          </Grid>
          {/* Grid de inputs */}

          {/* Grid de alertas */}
          <Grid 
            item xs={ 12 } 
            sx={{ marginTop: 2 }}
            display={ errorMessage ? '' : 'none'}
          >
            <Alert severity="error">{ errorMessage }</Alert>
          </Grid>
          {/* Grid de alertas */}

          {/* Grid de botones */}
          <Grid container spacing={ 2 } sx={{ marginY: 1 }}>

            <Grid item xs={ 12 } md={ 6 } justifyContent='center' alignItems='center'>
              <Button 
                disabled={ isAutenthicating }
                variant="contained" 
                fullWidth
                type="submit"
              >
                <Typography variant="button">Login</Typography>
              </Button>
            </Grid>

            <Grid item xs={ 12 } md={ 6 }>
              <Button 
                disabled={ isAutenthicating }
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography variant="button">Google</Typography>
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
                to="/auth/register"
                >
                  register here
              </Link>
            </Typography>
          </Grid>
          {/* Grid de redireccion */}

        </Grid>

      </form>

    </AuthLayout>
  )
}
