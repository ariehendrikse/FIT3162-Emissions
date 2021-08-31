import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

// const amikoFontFamily = ['Amiko', 'Helvetica', 'sans-serif'].join(',');
export const primaryColour = '#1392cd';
export const secondaryColour = '#0461BE';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: { main: primaryColour, contrastText: '#FFF', },
      secondary: { main: secondaryColour, contrastText: '#FFF' },
      
      
    },
    overrides: {
      MuiTableCell: {
          footer: {
              left: 0,
              bottom: 0, // <-- KEY
              zIndex: 2,
              position: 'sticky'
          }
      }
  }
  }),
);
