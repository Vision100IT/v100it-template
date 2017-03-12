import React from 'react';
import ReactDOM from 'react-dom';
import {renderToStaticMarkup} from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import Modal from 'react-modal2';
import {install} from 'offline-plugin/runtime';
import App from './containers/app/index.jsx';
import Layout from './containers/layout/index.jsx';
import Root from './containers/root/index.jsx';

if (typeof document !== 'undefined') {
	const render = Component => {
		ReactDOM.render(<Component/>, document.getElementById('application'));
	};

	render(App);

	if (process.env.NODE_ENV === 'production') {
		install();
	}

	Modal.getApplicationElement = () => document.getElementById('application');
}

export default (locals, callback) => {
	const html = renderToStaticMarkup(
		<Root>
			<StaticRouter location={locals.path} context={{}}>
				<Layout/>
			</StaticRouter>
		</Root>
	);

	callback(null, `<!doctype html>${html}`);
};
