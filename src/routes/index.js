/**
 * routes/index.js
 */

import uiRouter from 'angular-ui-router';

export default angular.module('routes', [
	uiRouter
])
.config(['$urlRouterProvider',

function defaultUrlConfig($urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
}]);

// now that module is created we can define things
require('./dashboard');
