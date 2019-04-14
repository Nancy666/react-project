import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Router from './router';   //引入的是全局的router文件

ReactDOM.render(<Router />, document.getElementById('root'));
registerServiceWorker();
