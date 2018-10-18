import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
const store = createStore(reducer, applyMiddleware(thunk));
ReactDOM.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
registerServiceWorker();
