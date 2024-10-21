import './assets/main.css';
import './assets/fontfaces.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';

function Root() {
  return <div id="root">
    <Views />
  </div>
}

ReactDOM.render(<Root />, document.getElementById('root'));
