import './assets/main.css';
import './assets/fontfaces.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Views from './views';

function Root() {
  return <Views />;  // Render the Views component directly
}

ReactDOM.render(<Root />, document.getElementById('root'));
