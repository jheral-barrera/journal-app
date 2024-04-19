import { SaveOutlined } from '@mui/icons-material'
import { Grid, Typography, Button, TextField } from '@mui/material'
import { ImageGallery } from '../components'

export const NoteView = () => {
  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>28 de agosto, 2023</Typography>
        </Grid>

        <Grid item>
            <Button color='primary' sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, marginRight: 1 }} />
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type='text'
                variant='filled'
                fullWidth
                placeholder='Enter Title'
                label='Title'
                sx={{ border: 'none', marginBottom: 1 }}
            />
            <TextField
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='What happened today?'
                minRows={ 5 }
                sx={{ border: 'none', marginBottom: 1 }}
            />

            {/* Galeria de imagenes subidas */}
            <ImageGallery />
        </Grid>
    </Grid>
  )
}
