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
	return new Promise((reject, resolve) => {
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
	return Promise.resolve().then(() => {
		CardStore.update(card);
	});
};

/**
 * Delete a card.
 */
CardActions.delete = function(card) {
	return Promise.resolve().then(() => {
		CardStore.remove(card);
	});
};

export default CardActions;
