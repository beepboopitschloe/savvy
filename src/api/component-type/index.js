import Service from '../service';

const defaults = {
	name: '',
	fieldTypes: []
};

export default class ComponentType {
	constructor(obj = {}) {
		_.defaults(obj, defaults);

		this._id = obj._id;

		this.name = obj.name;
		this.fieldTypes = obj.fieldTypes;
	}

	addFieldType(fieldType) {
		if (fieldType._id) {
			this.fieldTypes.push(fieldType._id);
		}
	}
}

ComponentType.dbName = 'componentType';
ComponentType.service = new Service(ComponentType);

