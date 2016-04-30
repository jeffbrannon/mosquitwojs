(function(){

    var modules = [];

    var moduleInstance = {
        linkedObject: function(){ console.log(this.$$moduleName, 'Hello'); }
    };

    var linkedModules = function(name, list = []) {
        list.push(modules[name]);
        var requires = modules[name].$$moduleRequires;
        for(var propt in requires) {
            list = linkedModules(requires[propt], list);
        }
        return list;
    }

    var module = function(name, requires) {
        if(requires) {
            if(!Array.isArray(requires)) muuvyte.throwError('<requires> must be of type array');
            modules[name] = Object.create(moduleInstance, {
                $$moduleName: { value: name },
                $$moduleRequires: { value: requires }
            });
        }
        return modules[name];
    };

    function throwError(message) {
        throw message;
    }

    var muuvyte = {
        module: module,
        throwError: throwError,
        linkedModules: function(name) {
            var result = linkedModules(name);
            for(var propt in result) {
                console.log('zz', result[propt].$$moduleName, result[propt]);
                result[propt].linkedObject();
            }
        }
    };

    window['muuvyte'] = muuvyte;

})();

muuvyte.module('module1', ['module2', 'module3']);
muuvyte.module('module2', []);
muuvyte.module('module3', ['module4']);
muuvyte.module('module4', []);

muuvyte.module('module1');
var f = muuvyte.module('module1');
console.log(f);
f.linkedObject();


var d = muuvyte.linkedModules('module3');

//muuvyte.module('module2', []);
//muuvyte.module('module3', ['module2']);
//muuvyte.module('module1', ['module3']);
//
//muuvyte.module('module2').linkedObject('jeff', {forename:'Jeff'});
//muuvyte.module('module3').linkedObject('susie', {forename:'Susie'});
//
//
//var d = muuvyte.module('module1').linkedObject('jeff');
//console.log(d);
//
//
//var f1 = muuvyte.module('module1');
//console.log(1, f1);
//var f2 = muuvyte.module('module2');
//console.log(2, f2);
//var f3 = muuvyte.module('module3');
//console.log(3, f3);


//var s = [];
//s['jeff'] = { forename:'Jeff' };
//s['susie'] = { forename:'Susie' };
//console.log(s);

//for(var propt in s){
//    console.log(propt, s[propt]);
//}


//muuvyte.linkWithBaseObject({name: 'jeff'});
//var g = muuvyte.linkWithBaseObject({age: 44});
//console.log(g);

//console.log(muuvyte.baseObjectComponentManager.components[''])






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
