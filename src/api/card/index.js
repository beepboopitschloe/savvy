/**
 * api/card/index.js
 */

import Service from '../service/index';

const defaults = {
	_id: null,
	components: []
};

export default class Card {
	constructor(obj = {}) {
		_.defaults(obj, defaults);
		_.extend(this, obj);
	}
}

Card.dbName = 'cards';
Card.service = new Service(Card);

