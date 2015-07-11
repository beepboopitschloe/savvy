/**
 * card/store.js
 *
 * Flux store for cards.
 */

import Store from '../store';
import db from './db';

let CardStore = new Store('cardId');

// load existing data from database
db.allDocs({
  include_docs: true
}, (err, result) => {
  if (err) {
    console.error(err);
  } else {
    CardStore.add(_.pluck(result.rows, 'doc'));
  }
});

export default CardStore;
