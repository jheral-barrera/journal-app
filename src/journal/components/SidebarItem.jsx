import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

export const SidebarItem = ({ id, title = '', body = '', date, imageUrls = [] }) => {
    const dispatch = useDispatch();
    
    const onClickNote = () => {        
        dispatch( setActiveNote({
            id,
            title,
            body,
            date,
            imageUrls,
        }))
    }

    const shortTitle = useMemo( () => { 
        return title.length > 20
            ? title.substring(0, 23) + '...'
            : title 
    }, [ title ]);

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container direction='column'>
                <ListItemText primary={ shortTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
