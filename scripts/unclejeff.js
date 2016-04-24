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
                if(this.components[name] === undefined) { throw this.type + ' undefined - ' + name; }
                return this.components[name];
            },
            getMultiple: function(names) {
                var result = [];
                for (var i = 0; i < names.length; ++i) {
                    result.push(this.get(names[i]));
                }
                return result;
            },
            set: function(name, componentObj) {
                if(this.components[name] !== undefined) { throw this.type + ' already defined - ' + name; }
                return this.components[name] = componentObj;
            }
        };

        return Object.create(componentManager, {
            type: { value: type },
            components: { value: [] }
        });
    };

    var ujClassComponentManager = ujComponentManagerFactory(ujComponentType.class);
    var ujModuleComponentManager = ujComponentManagerFactory(ujComponentType.module);
    var ujEnumComponentManager = ujComponentManagerFactory(ujComponentType.enum);

    var classAccess = function() {};
    var enumAccess = function() {};

    var ujModule = {
        class: classAccess,
        enum: enumAccess
    };


    var moduleAccess = function(name, dependentModules) {
        if(dependentModules !== undefined) {
            return this.moduleComponentManager.set(name, Object.create(ujModule, { dependentModules: {value: dependentModules} }));
        } else {
            var module = this.moduleComponentManager.get(name);
            if(module.dependentModuleRefs === undefined) {
                module.dependentModuleRefs = this.moduleComponentManager.getMultiple(module.dependentModules);
            }
            return module;
        }
    };




    var uj = {
        module: moduleAccess
    };

    uj.moduleComponentManager = ujComponentManagerFactory(ujComponentType.module);

    window['uj'] = uj;

})();

uj.module('module2', []);
uj.module('module3', []);
uj.module('module1', ['module2', 'module3']);

var f1 = uj.module('module1');
console.log(1, f1);

var f2 = uj.module('module1');
console.log(2, f2);

var f3 = uj.module('module2');
console.log(3, f3);

//Object.defineProperty(uj, "a", {
//    value: 2,
//    writable: true,
//    configurable: true,
//    enumerable: true
//});



//var Bar = Object.create(uj);
//Bar.constructor();

//Bar.module()();
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
