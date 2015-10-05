var Card = require('../src/api/card'),
	ComponentType = require('../src/api/component-type'),
	Component = require('../src/api/component');

console.log('starting');

db.query(function(doc) {
	emit(doc.body, doc._id);
}, { include_docs: true })
.then(function(result) {
	result.rows.forEach(function(row) {
		console.log(row);
	});
})
.catch(function(err) {
	throw err;
});

