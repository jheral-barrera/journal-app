import { Box, Toolbar } from "@mui/material"
import { Sidebar, Navbar } from "../components";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>

        {/* Navbar */}
        <Navbar drawerWidth={ drawerWidth } />

        {/* Sidebar  TERMINAR*/}
        <Sidebar drawerWidth={ drawerWidth } /> 

        {/* Main content */}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            
            {/* Toolbar */}
            <Toolbar />
        
            { children }
        </Box>

    </Box>
  )
}
