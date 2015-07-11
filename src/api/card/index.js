import CardActions from './actions';
import CardStore from './store';

const defaults = {
	cardId: null,
	title: '',
	body: ''
};

export default class Card {
	constructor(obj = {}) {
		_.defaults(obj, defaults);

		this.cardId = obj.cardId;
		this.title = obj.title;
		this.body = obj.body;
	}
}

Card.actions = CardActions;
Card.store = CardStore;
