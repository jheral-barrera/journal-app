import { IconButton, Typography } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident facilis quae, dolorum architecto iusto ad sint corrupti laboriosam. Qui consequuntur, quod enim provident debitis est nostrum ullam officiis ipsam deserunt!</Typography> */}
    
      {/* Nada selecionado */}
      <NothingSelectedView />

      <IconButton
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

      {/* Vista de la nota */}
      {/* <NoteView /> */}
    </JournalLayout>
  )
}
