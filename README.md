# mosquitwoJS
A JavaScript modular library utilising OLOO (objects-linked-to-other-objects) and dependency injection, inspired by https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md#delegation-theory

This library facilitates the chaining together of objects via a modular architecture.

To use mosquitwojs, just drop a single JavaScript file into your page:

```html
<script src="mosquitwo.min.js"></script>
```
### Bower
```bash
bower install mosquitwojs
```

## Module

A module is a collection of objects. Modules can be injected into other modules to create a component based architecture.

```bash
$msq.module(name, [requires]);
```

### Define a Module
```javascript
$msq.module('module2', []);
$msq.module('module1', ['module2']);
```
### Access a Module
```javascript
var module = $msq.module('module2');
```

## Linked Objects

A linked object is just a standard JavaScript object with declaration parameters enabling various linking features.

```bash
module.linkedObject(name, linkedObject, params);
```

### Define a Linked Object
```javascript
module.linkedObject('object2', {
    init: function() {
        console.info('hello');
    }
});
```
### Access a Linked Object
```javascript
var linkedObject = module.linkedObject('object2');
```
### Define a Linked Object with Parameters
```javascript
module.linkedObject('object2', {
    init: function() {
        console.info('hello');
    }
}, {
    internal: true,
    toBeLinked: true,
    linkedTo: 'object3'
});
```
### Linked Object Parameters Definitions
#### linkedTo
When accessing the defined object, it will be linked to this linked object
#### toBeLinked
The linked object can not be directly accessed. It must be linked to another linked object.
#### internal
The linked object can only be accessed from within another linked objected within the same module.

## Dependency Injection

The ability to inject linkedObjects into functions.

```bash
$msq.$inject([named object list, function]);
```

```javascript
module.linkedObject('object2', {
    init: $msq.$inject(['object1', function(object1){
        object1.log('hello');
    }])
});
```

## Base Linked Objects

These can be defined at both at the global and modular level and specify objects which will be linked to every linked object created at either the global or modular level.

```bash
$msq.$baseLinkedObject(object);

module.$baseLinkedObject(object);
```

### Global Base Linked Object
```javascript
$msq.baseLinkedObject({
    baseItem1: 'item1'
});
```

### Modular Base Linked Object
```javascript
module.baseLinkedObject({
    modularBaseItem1: 'item1'
});
```

## Obaervable Interface Linked Objects

under development - due shortly
