/**
 * dashboard/card-detail/index.js
 */

import angular from 'angular';
//import controller from './controller';

const template = require('./template.html');

angular.module('routes')
.config(['$stateProvider', cardDetailConfig]);

function cardDetailConfig($stateProvider) {
	$stateProvider
	.state('dashboard.cardDetail', {
		url: 'card/:cardId',
		template
	});
}

