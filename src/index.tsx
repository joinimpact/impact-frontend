import 'reflect-metadata';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactModal from 'react-modal';

import configureApp from 'core/configureApp';
import App from 'core/CoreApp';

import { AppContainer } from 'react-hot-loader';

ReactModal.setAppElement('#root');

const render = (component: React.ReactElement<any>) =>
	ReactDOM.render(<AppContainer>{component}</AppContainer>, document.getElementById('root'));

let appData = configureApp();

render(<App appModules={appData.appModules} store={appData.store} history={appData.history} />);

if (process.env.NODE_ENV !== 'production') {
	const hot = (module as any).hot;
	if (hot) {
		hot.accept(['./core/App', './core/configureApp'], () => {
			const nextConfigureApp: typeof configureApp = require('./core/configureApp').default;
			const NextApp: typeof App = require('./core/CoreApp').default;
			appData = nextConfigureApp(appData);
			render(<NextApp appModules={appData.appModules} store={appData.store} history={appData.history} />);
		});
	}
}
