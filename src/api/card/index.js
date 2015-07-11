import CardActions from './actions';
import CardStore from './store';
import db from './db';

const defaults = {
	cardId: null,
	title: '',
	body: ''
};

export default class Card {
	constructor(obj = {}) {
		_.defaults(obj, defaults);

		this._id = obj._id;
		this.title = obj.title;
		this.body = obj.body;
	}
}

Card.actions = CardActions;
Card.store = CardStore;

// load existing data from database
db.allDocs({
  include_docs: true
}, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    CardStore.add(result.rows.map((row) => {
			return new Card(row.doc);
		}));
  }
});
