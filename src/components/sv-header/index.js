/**
 * sv-header/index.js
 *
 * Defines a directive for the app's header.
 */

import angular from 'angular';
const template = require('./template.html');

export default angular.module('components')
.directive('svHeader', [svHeader]);

function svHeader() {
  return {
    template,

    link: (scope) => {
      scope.testHandler = () => {
        alert('you clicked the button');
      };
    }
  };
}
