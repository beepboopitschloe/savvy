/**
 * api/component/index.js
 *
 * Defines a model and service for a Component object.
 */

import Service from './service';

const defaults = {
	_id: null,
	componentType: null,
	fields: []
};

export default class Component {
	constructor(obj = {}) {
		_.extend(this, defaults, obj);
	}
}

Component.dbName = 'components';
Component.service = new Service(Component);

