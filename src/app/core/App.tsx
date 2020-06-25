import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'core/Routes';
import { Layout } from 'components/Layout/Layout';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from 'src/theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </MuiThemeProvider>
);

export default App;
