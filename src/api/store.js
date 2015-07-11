/**
 * store.js
 *
 * Generic implementation of a store object.
 */

import _ from 'lodash';
import EventEmitter from 'events';

function makeCallable(x) {
	return typeof x === 'function'? x : function() { return x; };
}

let events = {
	CHANGE: Symbol('CHANGE')
};

class Store extends EventEmitter {
	/**
	 * Constructor.
	 *
	 * @param  {string} indexBy The name of the key with which to index objects in
	 * the this._cache. 'commentId' for comment objects, 'postId' for post objects, etc.
	 */
	constructor(indexBy) {
		super();

		this.indexBy = indexBy || 'id';

		this._cache = {};
	}

	/**
	 * Get the ID of an item using the indexBy property.
	 */
	_getId(item) {
		return item[this.indexBy];
	}

	/**
	 * Get the contents of the this._cache, optionally filtered.
	 */
	getAll(filter) {
		// this flattens the hash into an array
		let result = _.map(this._cache);

		if (typeof filter === 'object') {
			result = _.where(result, filter);
		}

		return result;
	}

	/**
	 * Get a single item by ID.
	 */
	getById(id) {
		return this._cache[id];
	}

	/**
	 * Add an item or list of items to the this._cache and fire an ADD event. If any
	 * item in the list is already this._cached, an UPDATE event will be fired for it.
	 */
	add(items) {
		if (!_.isArray(items)) {
			items = [items];
		}

		let addEventPayload = [];

		_.each(items, (item) => {
			let id = this._getId(item);

			if (this._cache[id]) {
				this.emit(events.CHANGE, item, this);
			} else {
				addEventPayload.push(item);
			}

			this._cache[id] = item;
		});

		this.emit(events.CHANGE, addEventPayload, this);
	}

	/**
	 * Update an item in the this._cache and fire an UPDATE event. If the item does not
	 * exist, an ADD event will be fired instead.
	 */
	update(item) {
		let id = this._getId(item);

		this._cache[id] = item;
		this.emit(events.CHANGE, item, this);
	}

	/**
	 * Remove an item from the store and fire a REMOVE event.
	 */
	remove(item) {
		let id = this._getId(item);

		if (this._cache[id]) {
			delete this._cache[id];

			this.emit(events.CHANGE, item, this);
		}
	}

	/**
	 * Register a handler for any change in the this._cache.
	 *
	 * @param {function} listener Handler function.
	 * @param {object} filter Optional. Only provide items matching the filter to
	 *                        the listener function.
	 * @return {function} An unsubscribe function.
	 */
	onChange(listener, filter) {
		listener = makeCallable(listener);

		let cb = () => {
			listener(this.getAll(filter));
		};

		this.on(events.CHANGE, cb);

		return () => {
			this.removeListener(events.CHANGE, cb);
		};
	}
}

module.exports = Store;
