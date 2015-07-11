/**
 * api/card/actions.js
 *
 * Define Flux actions for dealing with cards.
 */

import uuid from 'uuid';
import CardStore from './store';

let CardActions = {};

/**
 * Create a new card.
 */
CardActions.create = function(card) {
	card.cardId = uuid.v4();

	return Promise.resolve().then(() => {
		CardStore.add(card);
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

