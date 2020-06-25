import { createMuiTheme } from "@material-ui/core";

export const bodyFontSize  = 14;
export const fontMedium  = 500;
export const fontBold  = 700;
export const mainFontSize  = 14;
export const blackMain  = '#001A34';
export const whiteMain  = '#fff';
export const grayMain  = '#979797';
export const grayLight = '#cccbcb';
export const grayDark  = '#767883';
export const primary = '#005BFF';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      contrastText: whiteMain,
    },
    secondary: {
      main: blackMain,
      contrastText: whiteMain,
    },
    text: {
      secondary: blackMain,
      disabled: grayMain,
    }
  },
  typography: {
    fontSize: mainFontSize,
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    h1: {
      fontSize: 32,
      lineHeight: '1.5',
      fontWeight: fontBold,
    },
    h2: {
      fontSize: 28,
      lineHeight: '1.4',
      fontWeight: fontBold,
    },
    h3: {
      fontSize: 20,
      lineHeight: '1.2',
      fontWeight: fontBold,
    },
    h4: {
      fontSize: 16,
      lineHeight: '1.2',
      fontWeight: fontBold,
    },
    h5: {
      fontSize: 14,
      lineHeight: '1.2',
      fontWeight: 'normal',
    },
    h6: {
      fontSize: 12,
      lineHeight: '1.2',
      fontWeight: fontBold,
    },
    body1: {
      color: blackMain,
      lineHeight: '1.3',
      fontSize: bodyFontSize,
    },
    caption: {
      color: grayMain,
      fontSize: 12,
    },
  },
  spacing: 4,
  overrides: {}
});
