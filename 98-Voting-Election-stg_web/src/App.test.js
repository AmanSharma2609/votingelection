/*
Developer : Aman Sharma, Satyendra Singh Chouhan, Piyush Sahu
File Name : App.test.js
Purpose   : Test file for App.js
*/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
