/**
 * bootstrap.js
 *
 * Loads the app and attaches it to the document.
 */

import angular from 'angular';
import savvy from './app';

angular.element(document).ready(() => {
	angular.bootstrap(document, [savvy.name], {
		strictDi: true
	});
});
