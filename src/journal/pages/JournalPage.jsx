import { Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"

export const JournalPage = () => {
  return (
    <JournalLayout>
      {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident facilis quae, dolorum architecto iusto ad sint corrupti laboriosam. Qui consequuntur, quod enim provident debitis est nostrum ullam officiis ipsam deserunt!</Typography> */}
    
      {/* Nada selecionado */}
      {/* <NothingSelectedView /> */}

      {/* Vista de la nota */}
      <NoteView />
    </JournalLayout>
  )
}
