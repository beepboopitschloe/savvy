/**
 * card/store.js
 *
 * Flux store for cards.
 */

import Store from '../store';
import db from './db';

let CardStore = new Store('cardId');

export default CardStore;
