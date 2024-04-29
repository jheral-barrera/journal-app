import { useDispatch, useSelector } from 'react-redux'
import { SaveOutlined } from '@mui/icons-material'
import { Grid, Typography, Button, TextField } from '@mui/material'

import { ImageGallery } from '../components'

import { useForm } from '../../hooks'
import { useEffect, useMemo } from 'react'
import { setActiveNote, startUpdateNotes } from '../../store/journal'

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.journal );
    const { title, body, date, handleInputForm, formState } = useForm({ initialForm:note });

    const dateString = useMemo( () => {
        const dateFormat = new Date( date );

        return dateFormat.toUTCString();
    }, [ date ] )

    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ] );

    const onSaveNote = () => {
        dispatch( startUpdateNotes() );
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <Grid item>
            <Button onClick={ onSaveNote } color='primary' sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, marginRight: 1 }} />
                Save
            </Button>
        </Grid>

        <Grid container>
            <TextField
                name='title'
                type='text'
                variant='filled'
                fullWidth
                placeholder='Enter Title'
                label='Title'
                sx={{ border: 'none', marginBottom: 1 }}
                value={ title }
                onChange={ handleInputForm }
            />
            <TextField
                name='body'
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='What happened today?'
                label='description'
                minRows={ 5 }
                sx={{ border: 'none', marginBottom: 1 }}
                value={ body }
                onChange={ handleInputForm }
            />

            {/* Galeria de imagenes subidas */}
            <ImageGallery />
        </Grid>
    </Grid>
  )
}
