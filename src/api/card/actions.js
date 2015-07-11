/**
 * api/card/actions.js
 *
 * Define Flux actions for dealing with cards.
 */

import db from './db';
import CardStore from './store';

let CardActions = {};

/**
 * Create a new card.
 */
CardActions.create = function(card) {
	return new Promise((resolve, reject) => {
		db.post(card, (err, result) => {
			if (err) return reject(err);

			card._id = result.id;
			CardStore.add(card);

			return resolve(card);
		});
	});
};

/**
 * Update an existing card.
 */
CardActions.update = function(card) {
	return db.get(card._id)
	.then((doc) => {
		_.extend(doc, card);
		return db.put(doc);
	})
	.then((result) => {
		CardStore.update(card);

		return card;
	});
};

/**
 * Delete a card.
 */
CardActions.delete = function(card) {
	return db.get(card._id)
	.then((doc) => {
		return db.remove(doc);
	})
	.then((result) => {
		CardStore.remove(card);
		return card;
	});
};

export default CardActions;
