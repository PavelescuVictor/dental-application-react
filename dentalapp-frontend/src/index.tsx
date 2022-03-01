import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './assets/fonts/index.css';
import './assets/css/reset.min.css';
import { Provider } from 'react-redux';
import store from './store/store';
import theme from './theme';
import App from './App';

const GlobalStyle = theme.globalStyle;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);
