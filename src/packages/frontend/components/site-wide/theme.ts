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

    // typography: {
    //   fontFamily: amikoFontFamily,
    //   fontWeightBold: 700,
    //   fontWeightLight: 400,
    //   fontWeightMedium: 600,
    //   fontWeightRegular: 400,
    //   body1: {
    //     letterSpacing: -1,
    //     lineHeight: 1.7,
    //   },
    //   body2: {
    //     letterSpacing: -1,
    //     lineHeight: 1.7,
    //   },
    //   button: {
    //     letterSpacing: 1,
    //     lineHeight: 1.7,
    //   },
    //   caption: {
    //     lineHeight: 1.7,
    //   },
    //   h1: {
    //     color: primaryColour,
    //     fontSize: '4rem',
    //     fontWeight: 300,
    //     letterSpacing: -2,
    //     lineHeight: 1,
    //   },
    //   h2: {
    //     fontSize: '3rem',
    //     fontWeight: 300,
    //     letterSpacing: -2,
    //     lineHeight: 1,
    //   },
    //   h3: {
    //     fontSize: '2.5rem',
    //     fontWeight: 300,
    //     letterSpacing: -2,
    //     lineHeight: 1,
    //   },
    //   h4: {
    //     fontSize: '2rem',
    //     fontWeight: 300,
    //     letterSpacing: -2,
    //     lineHeight: 1,
    //   },
    //   h5: {
    //     fontSize: '1.75rem',
    //     fontWeight: 400,
    //     letterSpacing: -2,
    //     lineHeight: 1,
    //   },
    //   h6: {
    //     fontSize: '1.25rem',
    //     fontWeight: 600,
    //     letterSpacing: -2,
    //     lineHeight: 1.7,
    //   },
    //   overline: {
    //     letterSpacing: 1,
    //     lineHeight: 1.7,
    //   },
    // },
  }),
);
