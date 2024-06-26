import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuthLoading = () => {
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
        container
        direction='row'
        justifyContent='center'
      >
        <CircularProgress color="warning" />
      </Grid>

    </Grid>
  )
}
