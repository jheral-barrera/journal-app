import { Grid, Typography } from "@mui/material"

const boxWidth = 450;

export const AuthLayout = ({ children, title }) => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.main',
        padding: 4,
      }} // estilo que tendra el componente
    >

      <Grid
        item
        className="box-shadow animate__animated animate__fadeIn animate__faster"
        xs={ 3 } // tamano de la caja/pantalla xs/sm/md/xl/
        sx={{
          width: { sm: boxWidth },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
        }} // estilo que tendra el componente
      >
        <Typography variant="h5">{ title }</Typography>

        { children }

      </Grid>
    </Grid>
  )
}
