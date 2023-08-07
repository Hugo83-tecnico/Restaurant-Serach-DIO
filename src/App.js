import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import store from './redux/store';
import Home from './pages/home/index';
import theme from './theme';


class App extends Component {
  render() {
    return (

    <Provider store={store}>
       <ThemeProvider theme={theme}>
          <Home/>
      </ThemeProvider>
    </Provider>

  
    );
  }
}

export default App;