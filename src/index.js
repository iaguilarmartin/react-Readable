import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import App from './app/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducers';

const enhancer = composeWithDevTools(
	applyMiddleware(thunk, createLogger())
);

const store = createStore(reducer, enhancer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
