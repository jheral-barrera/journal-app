import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#34495E'
            // main: '#262254'
        },
        secondary: {
            main: '#BDC3C7'
            // main: '#543884'
        },
        button: {
            main: '#BDC3C7'
        },
        error: {
            main: red.A400
        }
    }
})
