/**
 * react/app.js
 *
 * Starts the router.
 */

import React from 'react';
import Router from 'react-router';

import routes from './routes';

let { RouteHandler, Route } = Router;

class App extends React.Component {
	render() {
		return (
			<div>
				<RouteHandler/>
			</div>
		);
	}
}

/**
 * Define routes
 */
let handlers = (
	<Route name="app" path="/" handler={App}>
		<Route name="dashboard"
				path="/"
				handler={routes.Dashboard}/>
	</Route>
);

Router.run(handlers, (Handler) => {
	React.render(<Handler/>, document.getElementById('app-root'));
});

