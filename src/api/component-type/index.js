/**
 * api/component-type/index.js
 *
 * Defines a model and service for a ComponentType object.
 */

import Service from '../service';
import Component from '../component';

const defaults = {
	_id: null,
	name: '',
	fieldTypes: []
};

export default class ComponentType {
	constructor(obj = {}) {
		_.extend(this, defaults, obj);
	}

	addFieldType(fieldType) {
		if (fieldType._id) {
			this.fieldTypes.push(fieldType._id);
		}
	}

	createComponent() {
		let component = new Component();
		component.componentType = this._id;

		component.fields = this.fieldTypes.map((fieldType) => {
			return fieldType.createField();
		});
	}
}

ComponentType.dbName = 'componentTypes';
ComponentType.service = new Service(ComponentType);
ComponentType.store = ComponentType.service.store;

