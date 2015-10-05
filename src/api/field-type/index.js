/**
 * api/field-type/index.js
 *
 * Defines a model and service for a FieldType object.
 */

import _ from 'lodash';

import Service from '../service';
import Field from '../field';

const defaults = {
	_id: null,
	inputType: 'text',
	inputOptions: {}
};

export default class FieldType {
	constructor(obj = {}) {
		_.extend(this, defaults, obj);
	}

	createField(obj = {}) {
		obj.fieldType = this._id;
		obj.value = null;

		return new Field(obj);
	}
}

FieldType.dbName = 'fieldTypes';
FieldType.service = new Service(FieldType);

