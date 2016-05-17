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

