import React from 'react';
import ReactDOM from 'react-dom';
import { toJS } from 'mobx';
import './index.css';
import './index.scss';
import 'antd/dist/antd.css';
import { App } from 'src/app/components';
import { flags } from './flags';
import { setOptions } from 'skandha';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if (flags.logSkandha) {
  setOptions({
    logging: true,
    formatObject: (x: any) => toJS(x),
  });
}
