import { useDispatch, useSelector } from 'react-redux'
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material'
import { Grid, Typography, Button, TextField } from '@mui/material'
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

import { ImageGallery } from '../components'

import { useForm } from '../../hooks'
import { useEffect, useMemo, useRef } from 'react'
import { setActiveNote, startUpdateNotes, startUploadingFiles, startDeletingNote } from '../../store/journal'

export const NoteView = () => {
    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { title, body, date, handleInputForm, formState } = useForm({ initialForm:note });

    const dateString = useMemo( () => {
        const dateFormat = new Date( date );

        return dateFormat.toDateString();
    }, [ date ] )

    const fileInputRef = useRef();

    useEffect( () => {
        dispatch( setActiveNote( formState ) )
    }, [ formState ] );

    useEffect( () => {
        if ( messageSaved.length > 0 ) {
            Swal.fire( 'Nota actualizada', messageSaved, 'success' );
        }
    }, [ messageSaved ] )

    const onSaveNote = () => {
        dispatch( startUpdateNotes() );
    }

    const onInputFileChanged = ({ target }) => {
        if ( target.files === 0 ) return;
        dispatch( startUploadingFiles( target.files ) );
    }
    
    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ marginBottom: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>


        <input
            ref={ fileInputRef }
            type='file'
            accept='image/jpeg, image/png'
            multiple
            onChange={ onInputFileChanged }
            style={{ display: 'none' }}
        />

        <Grid item >
            <Button
                onClick={ onDelete }
                sx={{ padding: 2 }}
                color='primary'
                disabled={ isSaving }
            >
                <DeleteOutline sx={{ fontSize: 30, marginRight: 1 }} />
                Delete
            </Button>
        </Grid>
        <Grid item>
            <Button disabled={ isSaving } onClick={ () => fileInputRef.current.click() } color='primary' sx={{ padding: 2 }}>
                <UploadOutlined sx={{ fontSize: 30, marginRight: 1 }} />
                Upload Image
            </Button>
        </Grid>
        <Grid item>
            <Button disabled={ isSaving } onClick={ onSaveNote } color='primary' sx={{ padding: 2 }}>
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
            <ImageGallery images={ note?.imagesUrls } />
        </Grid>
    </Grid>
  )
}
