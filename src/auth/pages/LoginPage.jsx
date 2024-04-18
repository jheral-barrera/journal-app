import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import { AuthLayout } from "../layout/AuthLayout"

export const LoginPage = () => {
  return (
    <AuthLayout title='Login'>
      <form>
        <Grid container>
          {/* Grid de inputs */}
          <Grid item xs={ 12 }>
            <TextField 
              label="E-mail" 
              type="email" 
              placeholder="Example@mail.com" 
              fullWidth
              sx={{ marginTop: 2}}
            />
            <TextField 
              label="Password" 
              type="password" 
              placeholder="Password" 
              fullWidth
              sx={{ marginTop: 2}}
            />
          </Grid>
          {/* Grid de inputs */}

          {/* Grid de botones */}
          <Grid container spacing={ 2 } sx={{ marginY: 1 }}>
            <Grid item xs={ 12 } md={ 6 } textAlign='center'>
              <Button 
                variant="contained" 
                fullWidth
              >
                <Typography variant="button">Login</Typography>
              </Button>
            </Grid>
            <Grid item xs={ 12 } md={ 6 }>
              <Button 
                variant="contained" 
                fullWidth
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
