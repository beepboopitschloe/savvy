/**
 * api/field/index.js
 *
 * Defines a model and service for Field objects.
 */

import _ from 'lodash';

import Service from '../service';

const defaults = {
	_id: null,
	name: null,
	fieldType: null,
	value: null
};

export default class Field {
	constructor(obj = {}) {
		_.extend(this, defaults, obj);
	}
}

Field.dbName = 'fields';
Field.service = new Service(Field);

