'use strict';

(function(){

    var ujComponentType = {
        class: 'Class',
        module: 'Module',
        enum: 'Enum'
    };

    var ujComponentManagerFactory = function(type) {

        var componentManager = {
            get: function(name) {
                if(this.components[name] === undefined) { throw this.type + ' undefined'; }
                return this.components[name];
            },
            set: function(name, componentObj) {
                if(this.components[name] !== undefined) { throw this.type + ' already defined'; }
                this.components[name] = componentObj;
            }
        };

        return Object.create(componentManager, {
            type: { value: type },
            components: { value: [] }
        });
    };

    var ujClass = ujComponentManagerFactory(ujComponentType.class);
    var ujModule = ujComponentManagerFactory(ujComponentType.module);
    var ujEnum = ujComponentManagerFactory(ujComponentType.enum);

    //Object.preventExtensions(ujModuleClass);


    //ujModuleClass.set('jeff', {name: 'hhhh'});
    ujClass.set('jeff', {name:'jeff'});
    var m = ujModule.get('jeff');
    console.log(m);

})();


var ujClass = function(name, classObj) {
    if(classObj !== undefined) {

    } else {

    }
};

var ujModule = function(name, dependencies) {
    return ujClass;
};

window['uj'] = {
    module: ujModule
};

//Object.defineProperty(uj, "a", {
//    value: 2,
//    writable: true,
//    configurable: true,
//    enumerable: true
//});



var Bar = Object.create(uj);
//Bar.constructor();

Bar.module()();
//console.log(Bar.a);



//var m = uj.module('module1',{
//    reference: ['module2', 'module3']
//});
//
//m.class('service1', {
//    singleton: true,
//    constructor: function() {}
//});
//
//m.class('class1', {
//    internal: true,
//    mustInherit: true,
//    constructor: function() {}
//});
//
//m.class('class2', {
//    extends: 'class1',
//    constructor: ['service1', function(service1) {}]
//});
//
//m.enum('enum1', {
//    item1: 0,
//    item2: 1
//});
