import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers/index';
import './index.css';
import App from './components/App';
import 'tachyons';

ReactDOM.render(<Provider store={createStore(reducers)}>
      <App/>
    </Provider>,
    document.getElementById('root')
)