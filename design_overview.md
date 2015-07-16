# savvy roadmap

I have a solid foundation for building this thing, now I need to figure out
exactly what I want it to do.

## problems with existing software

None of the software I've tried-- Trello, Wunderlist, Todoist, Jira, even
Workflowy-- really gives you freedom to structure your data exactly how you want
to. *All of them expect you to know how your project is going to be structured
before the project begins.*

### Trello

Like:

- the card-themed interface
- lots of metadata fields on cards

Don't like:

- not intuitive
- can't easily move checklists between cards
- can't create arbitrarily-nested lists

### Jira

Like:

- rich integration with other enterprise products

Dislike:

- complicated
- slow
- too much cruft

### Todoist

Like:

- super easy to add new tasks in batches

Dislike:

- it's a todo list, not a project planning/management tool
- still has arbitrary structures like lists and items

### Wunderlist

Like:

- attractive
- 'notes' field

Dislike:

- same as Todoist

### Workflowy

Like:

- super modular

Dislike:

- feels like a note-taking application

### Podio

Like:

- highly configurable in a way very similar to what I'm envisioning

Dislike:

- slow, inefficient workflow

## what makes savvy different

Savvy should be built on a unified system in which all elements (cards,
documents, whatever they end up being called) are the same kind of object. We'll
call them cards for now. The idea is that, for example, a project is a card, a
task is a card, a todo list inside that task is a card, comments on the task
are cards, and so on and so forth. Cards contain cards. It's turtles all the
way down.

The advantage of this is that your project management structure can grow
organically with the requirements and the team. It is flexible enough to support
both ad-hoc, one-man projects and multi-team, multi-product efforts; and it can
be reorganized and scaled as necessary.

In order to support this structure, we take inspiration from OSAF's Chandler,
and in turn from entity-component systems. A card by itself requires nothing
but an ID. All the logic-- both business and display-- is controlled by
components.

For example, if you are creating a project, you would make a new card and stamp
it with the Project component. This adds two new data fields: Project Title and
Project Description. Since the card only has one component, it acts as the
primary component, controlling how the card displays. Here is what the interface
would look like with this single component:

```
+-----------------------------------------------+
|                                               |
|   PROJECT                                     |
|     Title:        _________                   |
|     Description:  _________                   |
|                                               |
+-----------------------------------------------+
```

Now, when you want to create a task inside the project, you create a
relationship with a new card. At first the only relationship will be a
parent-child relationship; so you click an "Add Child From New Card" button,
stamp the new card with the Task component, do it a few more times, and get
this:

```
+-----------------------------------------------+
|                                               |
|   PROJECT                                     |
|     Title:        _________                   |
|     Description:  _________                   |
|                                               |
|   TASKS                                       |
|     (some task)                               |
|     (some task)                               |
|     (some task)                               |
|                                               |
+-----------------------------------------------+
```

When cards are displayed in a list like that, their display behaviour is
controlled by the primary component.

## data objects

### Card

Basic unit of management.

#### schema

- _id {string} PouchDB unique ID.
- components {Array} Array of component _ids.
- relations {Map<string, string>} List of relations by relation name,
	referencing the _id field of some card.

### ComponentType

A class of component that is available to be instantiated.

#### schema

- _id {string} PouchDB unique ID.
- name {string} User-facing name of the component.
- fieldTypes {Array} Field types to attach to instantiated components.

### Component

A modular piece of behaviour that can be attached to a card. Instantiated from
a ComponentType.

#### schema

- _id {string} PouchDB unique ID.
- fields {Array} Array of Field instances.
- behaviours {Array} Array of Behaviour instances.

### FieldType

A class of Field that is available to be attached to ComponentTypes.

#### schema

- _id {string} PouchDB unique ID.
- inputType {string} One of text, number, textarea, checkbox,
  select, date, card, component, componentType.
- inputOptions {json} Options for the input. eg, this is where the options for
                      a <select> would go, or the min/max fields for a number.

### Field

A piece of a component that is used to enter and display data, such as an input,
textarea, checkbox, etc. Instantiated from a FieldType. Currently the logic will
be defined at the application level, hopefully to be opened up to an Atom-like
package system at some point.

#### schema

- _id {string} PouchDB unique ID.
- name {string} The name of the field.
- type {FieldType} ID of the FieldType parent class.
- value {any} The current value of the field.

### BehaviourType

A class of Behaviour that is available to be attached to ComponentTypes.
Contains Javascript code run in a sandboxed environment. Implementation details
TBD.

- _id {string} PouchDB unique ID.
- name {string} Name of the behaviour type.
- code {string} Javascript code to execute.

### Behaviour

A logical behaviour for a component, such as "alert user on with X message on Y
date". Instantiated from a BehaviourType. Implementation details TBD.

- _id {string} PouchDB unique ID.
- type {string} ID of the BehaviourType class.
- data {json} Persistent state of the behaviour.

## application structure

The grand vision is similar to Atom, in that the core module is essentially just
a runtime for other packages. A package can contain different components,
component sets, behaviours, and possibly fields for use within the application.
It is defined via a Podio-like UI.

## roadmap for savvy (core)

### 0.1.0

- create cards
- stamp cards with hardcoded components
- hard-coded "child" relationship type

### 0.2.0

- user-defined components with hard-coded field types
- user-defined card relationships

### 0.3.0

- define custom behaviours

### 0.4.0

- user-defined component groups

### 0.5.0

- user accounts
- sync to central CouchDB

### 0.6.0

- component package distribution

