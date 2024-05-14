import { Box, Toolbar } from "@mui/material"
import { Sidebar, Navbar } from "../components";
import { useState } from "react";

const drawerWidth = 280;

export const JournalLayout = ({ children }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  const handleOpenSidebar = () => setIsOpen( !isOpen );


  return (
    <Box 
      sx={{ display: 'flex' }}
      className='animate__animated animate__fadeIn animate__faster'
    >

        {/* Navbar */}
        <Navbar handleOpenSidebar={ handleOpenSidebar } drawerWidth={ drawerWidth } />

        {/* Sidebar  TERMINAR*/}
        <Sidebar isOpen={ isOpen } handleOpenSidebar={ handleOpenSidebar } drawerWidth={ drawerWidth } /> 

        {/* Main content */}
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
            
            {/* Toolbar */}
            <Toolbar />
        
            { children }
        </Box>

    </Box>
  )
}
