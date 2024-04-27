import { TurnedInNot } from "@mui/icons-material"
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export const Sidebar = ({ drawerWidth }) => {
  const { displayName } = useSelector( state => state.auth );

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open={true}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component='div'
            noWrap
          >
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container direction='column'>
                    <ListItemText primary={ text } />
                    <ListItemText secondary={ 'Lorem ipsum no se que no tengo lra extension que te da mas' } />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
