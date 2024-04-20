import { StarOutline } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export const NothingSelectedView = () => {
  return (
    <Grid
      container
      spacing={ 0 }
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: 'calc(100vh - 110px)',
        backgroundColor: 'primary.main',
        borderRadius: 3
      }} // estilo que tendra el componente
    >

        <Grid item xs={ 12 }>
            <StarOutline sx={{ fontSize: 50, color: 'white'}} />
        </Grid>
        <Grid item xs={ 12 }>
            <Typography variant="h5" sx={{ color: 'white' }}>
                Select or create an entry
            </Typography>
        </Grid>
    

    </Grid>
  )
}
