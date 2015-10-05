# thoughts on database architecture

How should the app be architectured? As I see it, there are currently a couple
of ways:

1. PouchDB on the client side, in the renderer process, with optional syncing
   to remote CouchDB in the future. Benefits: don't need the overhead of an
	 external server right away. Drawbacks: I'm much more comfortable with SQL.
2. Same as above, but with PouchDB running in the main process. This has the
   added benefit of using LevelUP for speed, although it adds some extra
	 overhead for communicating between the two processes.
3. Throw up a MySQL-based CRUD app as fast as possible. This wouldn't take much
   time, but I'm a little tired of CRUD apps. It would be more interesting to
	 write an application which holds a local store in higher esteem than a
	 remote store.

After noodling, I think #2 is probably the best solution. It's most likely the
fastest, and probably the one that would be adopted eventually anyway.

Implementation details:

- renderer process keeps immutable Flux stores as a cache, as per usual
- main process keeps persistent on-disk PouchDB store, and theoretically
  replicates it out to a CouchDB instance somewhere depending on user
	authentication
- main process is notified of writes, renderer process is notified by changes
  in the remote CouchDB instance

Code will need to be restructured like so:

```
savvy/
	build/
		client/
			bundle.js (bundled from src/client)
			bundle.css (bundled from styles)
		index.html (copied from src)
		main.js (bundled from src/main)
	src/
		main/
			index.js
			// other stuff
		client/
			// stuff
		index.html
```

Since the backend process is now more complex, it will be transpiled from ES6
alongside the frontend. See
[this blog post](http://jlongster.com/Backend-Apps-with-Webpack--Part-I)
for the deets. Depending on how clever I get with webpack, I could even cut
Gulp out of the build process entirely, now that I think about it.

ACTUALLY nevermind. Using the babel require hook for the backend sounds much
simpler. See http://babeljs.io/docs/usage/require/. So the structure will be:

```
savvy/
	build/
		bundle.js
		bundle.css
	process/
		(ES6 code for the backend)
	client/
		(ES6 code for the frontend)
	index.html
	main.js (bootstraps ES6 code from process/)
```

So the build/run process remains the same.

In that case-- how to organize the backend API? Passing a callback is iffy due
to leaks. But maybe it's not iffy in this case, since the process isn't supposed
to persist after the window exits. Hmm.

OTOH, we can access Node code from the renderer process, so maybe we don't have
to shift responsibility to the main process in order to take advantage of
LevelDOWN? *EDIT: this doesn't work because the renderer process can't access
the child_process module.*

So we do have to communicate between the processes. The trouble is, how do we
do that safely? I think using IPC instead of remote is probably the best way
to do it. It circumvents this weird "remote function" headspace.

Target usage:

```
//---------
// client
import ipc from 'ipc';

console.log(ipc.sendSync('card-create-sync', {...args}));
//=> Card#jjdkk-dkdfjfk-dldkflaksjd-dklasj

// or async
ipc.send('card-create', {...args});

ipc.on('card-create-reply', (evt, response) {
	console.log(response);
	//=> Card#dkjdlkjl-dkdkd-dlkkdj-alksdlkadsf

	// deregister this callback
});

//---------
// server
import ipc from 'ipc';

function cardCreate(event, args) {
	let card = new Card(args);

	if (event.sender) {
		// async response
		event.sender.send(card);
	}

	// sync response
	event.returnValue = card;
}

ipc.on('card-create', cardCreate);
ipc.on('card-create-sync', cardCreate);
```

Benefits: less confusing to work with than the remote module.

Drawbacks: at this point it's essentially a REST API without the benefits of
using REST/HTTP.

# thoughts on object construction

What should the flow for defining a component type be? It's a bit weird and
meta.

1. Define ComponentType 'Foo' in database
 - includes FieldTypes
2. Instantiate Card
3. Stamp card with new 'Foo' component
 - instantiates Foo
  - instantiates Fields

I guess that makes sense written out, it's just an unusual construct.

