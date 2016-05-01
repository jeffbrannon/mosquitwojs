(function(){

    var modules = [];

    //var linkedObjectInstance = { };

    var findLinkedObjectInModules = function(modules, objName, moduleName) {
        var result = [];
        for(var index in modules) {
            var obj = modules[index].$$linkedObjects[objName];
            if(obj && !((modules[index].$$moduleName != moduleName) && obj.$$params.internal)) {
                result.push(obj);
            }
        }
        if(result.length === 0) muuvyte.throwError('linked object <' + objName + '> undefined');
        if(result.length > 1) muuvyte.throwError('linked object <' + objName + '> ambiguous');
        return result[0];
    };

    var linkedObject = function(name, linkedObj, params = {}) {
        if(linkedObj) {
            if(this.$$linkedObjects[name] !== undefined) muuvyte.throwError('linked object <' + name + '> already defined');
//            return this.$$linkedObjects[name] = Object.create(linkedObjectInstance, {
//                $$linkedObjectName: { value: name },
//                $$linkedObject: { value: linkedObj },
//                $$params: { value: params }
//            });

            this.$$linkedObjects[name] = {
                $$linkedObjectName: name,
                $$linkedObject: linkedObj,
                $$params: params,
                $$moduleName: this.$$moduleName
            };
        } else {
            if(!this.$$instance) {
                if(!this.$$linkedModules) {
                    this.$$linkedModules = linkedModules(this.$$moduleName);
                }
                var result = findLinkedObjectInModules(this.$$linkedModules, name, this.$$moduleName);
                if(result.$$params.toBeLinked) muuvyte.throwError('linked object <' + name + '> must be linked');
                var baseLink= {};
                this.$$instance = Object.assign(baseLink, result.$$linkedObject);
            }
            return this.$$instance;
        }
    }

    var linkedModules = function(name, list = []) {
        list.push(modules[name]);
        var requires = modules[name].$$moduleRequires;
        for(var propt in requires) {
            list = linkedModules(requires[propt], list);
        }
        return list;
    }

    var baseLinkedObject = function(baseObject) {
        this.$$baseObject = Object.assign(this.$$baseObject || {}, baseObject);
    };

    var moduleInstance = {
        linkedObject: linkedObject,
        baseLinkedObject: baseLinkedObject
    };

    var module = function(name, requires) {
        if(requires) {
            if(!Array.isArray(requires)) muuvyte.throwError('<requires> must be of type array');
            if(modules[name] !== undefined) muuvyte.throwError('module <' + name + '> already defined');
            modules[name] = Object.create(moduleInstance, {
                $$moduleName: { value: name },
                $$moduleRequires: { value: requires },
                $$linkedObjects: { value: [] }
            });
        }
        if(modules[name] === undefined) muuvyte.throwError('module <' + name + '> undefined');
        return modules[name];
    };

    var throwError = function(message) {
        throw message;
    }

    var muuvyte = {
        module: module,
        baseLinkedObject: baseLinkedObject,
        throwError: throwError
    };

    window['muuvyte'] = muuvyte;

})();

muuvyte.module('module1', ['module2', 'module3']);
muuvyte.module('module2', []);
muuvyte.module('module3', ['module4']);
muuvyte.module('module4', []);


var module1 = muuvyte.module('module1');
module1.linkedObject('object1', { name: 'Jeff' }, { internal: true });

var module3 = muuvyte.module('module3');
module3.linkedObject('object2', { name: 'Susie' }, {});


console.log(module1.linkedObject('object1'));
console.log(muuvyte.module('module1').linkedObject('object2'));

var jeff = {
    name: 'jeff'
};

var f = Object.create({}, jeff);

console.log(jeff);

//muuvyte.baseLinkedObject({item1: 'item1'});
//console.log(muuvyte);
//muuvyte.module('module1').baseLinkedObject({item2: 'item2'});
//console.log(muuvyte.module('module1'));

