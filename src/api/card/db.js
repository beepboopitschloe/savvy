/**
 * card/db.js
 *
 * Database for Card objects.
 */

import PouchDB from 'pouchdb';

export default new PouchDB('cards');
