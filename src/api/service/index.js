/**
 * api/service/index.js
 *
 * Defines an API service class.
 */

import PouchDB from 'pouchdb';
import Store from './store';

export default class Service {
	constructor(Model = null) {
		if (!Model || !Model.dbName) {
			throw new Error('Service requires a model with static property dbName.');
		}

		this.db = new PouchDB(process.cwd() + '/data/' + Model.dbName);

		console.log(this.db);

		this.store = new Store();

		// load existing docs from the database
		this.db.allDocs({
			include_docs: true
		}).then((result) => {
			this.store.add(result.rows.map((row) => {
				return new Model(row.doc);
			}));
		})
		.catch((err) => { throw err; });
	}

	create(obj) {
		return Promise.resolve()
		.then(() => {
			if (obj._id) {
				throw new Error('_id field must be undefined for create operation');
			}

			return this.db.post(obj);
		})
		.then((result) => {
			obj._id = result.id;
			this.store.add(obj);

			return obj;
		});
	}

	update(obj) {
		return Promise.resolve()
		.then(() => {
			if (!obj._id) {
				throw new Error('_id is required for update operation');
			}

			return this.db.get(obj._id);
		})
		.then((doc) => {
			_.extend(doc, obj);

			return this.db.put(doc);
		})
		.then((result) => {
			this.store.update(obj);

			return obj;
		});
	}

	delete(obj) {
		return Promise.resolve()
		.then(() => {
			if (!obj._id) {
				throw new Error('_id is required for delete operation');
			}

			return this.db.get(obj._id);
		})
		.then((doc) => {
			return this.db.remove(doc);
		})
		.then((result) => {
			this.store.remove(obj);

			return obj;
		});
	}
}

