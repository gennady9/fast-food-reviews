import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'


//import theme - change nova-light to other theme as needed
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store, add reducers, attach saga
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
);

//run saga(s)
sagaMiddleware.run(Sagas);

// Render the main component into the dom

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'));


