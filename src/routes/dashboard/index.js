/**
 * dashboard/index.js
 */

import angular from 'angular';
import controller from './controller';

const template = require('./template.html');

angular.module('routes')
.config(['$stateProvider', dashboardConfig]);

function dashboardConfig($stateProvider) {
  $stateProvider
  .state('dashboard', {
    url: '/',
    template,
    controller,
    controllerAs: 'dashboard'
  });
}
