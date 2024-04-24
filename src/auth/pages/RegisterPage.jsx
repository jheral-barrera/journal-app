import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
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
  password: [ (value) => value.length <= 6, 'The password must be at least 6']
}

export const RegisterPage = () => {
  const { 
    displayName, email, password, handleInputForm,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm({ initialForm: formData, formsValidations });

  console.log(displayNameValid);

  const onSubmit = ( event ) => {
    event.preventDefault();
    console.log({ displayName, email, password })
  }

  return (
    <AuthLayout title='Register'>

      <form onSubmit={ onSubmit }>

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
              error={ displayNameValid }
              helperText={ displayNameValid }
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

          {/* Grid de botones */}
          <Grid container spacing={ 2 } sx={{ marginY: 1 }}>
            <Grid item xs={ 12 } md={ 12 } textAlign='center'>
              <Button 
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
