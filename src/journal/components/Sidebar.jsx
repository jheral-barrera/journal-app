import { MenuOutlined, TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SidebarItem } from "./SidebarItem";

export const Sidebar = ({ drawerWidth, isOpen, handleOpenSidebar }) => {
  const { displayName } = useSelector( state => state.auth );
  const { notes } = useSelector( state => state.journal );

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={ isOpen }
        // className='animate__animated animate__fadeIn animate__faster'
        sx={{
          display: isOpen ? { xs: 'none', sm: 'block' } : 'block',
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          zIndex: 1200 
        }}
      >
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Typography
            variant="h6"
            component='div'
            noWrap
          >
            { displayName }

          </Typography>
          <IconButton
              color="inherit"
              edge="end"
              sx={{ display: { sm: 'none'}}}
              onClick={ handleOpenSidebar }
          >
              <MenuOutlined />
          </IconButton>
        </Toolbar>
        <Divider />

        <List>
          {
            notes.map( note => (
              <SidebarItem 
                key={note.id}  
                id={note.id}
                title={note.title} 
                body={note.body}
                date={note.date}
                imagesUrls={note.imagesUrls}
                // {...note}
              />
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
