import { useDispatch, useSelector } from "react-redux"

import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPage = () => {
  const { isSaving, active } = useSelector( state => state.journal );
  const dispatch = useDispatch();
  
  const onClickNewNote = () => {
    dispatch( startNewNote() );
  }

  return (
    <JournalLayout>

      {
        ( !!active )
          ? <NoteView />
          : <NothingSelectedView />
      }


      {/* Nada selecionado */}
      {/* <NothingSelectedView /> */}

      {/* Vista de la nota */}
      {/* <NoteView /> */}

      <IconButton
        disabled={ isSaving }
        onClick={ onClickNewNote }
        size="small"
        sx={{
          color: 'white',
          backgroundColor: 'button.main',
          ':hover': { backgroundColor: 'button.main', opacity: 0.7 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
