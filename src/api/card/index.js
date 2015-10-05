/**
 * api/card/index.js
 *
 * Defines a model and service for a Card object.
 */

import Service from '../service/index';

const defaults = {
	_id: null,
	components: []
};

export default class Card {
	constructor(obj = {}) {
		_.extend(this, defaults, obj);
	}
}

Card.dbName = 'cards';
Card.service = new Service(Card);
Card.store = Card.service.store;

