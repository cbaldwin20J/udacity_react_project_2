import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import './index.css';
import App from './components/App';
import reducers from './reducers'
import middleware from './middleware'
import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, middleware )

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
	);

serviceWorker.unregister();



