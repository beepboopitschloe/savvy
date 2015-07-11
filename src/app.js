/**
 * react/app.js
 *
 * Starts the router.
 */

import angular from 'angular';
import ngMaterial from 'angular-material';

import components from './components';
import routes from './routes';

export default angular.module('savvy', [
	ngMaterial,
	components.name,
	routes.name
]);
