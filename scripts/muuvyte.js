(function(){

    var modules = [];

    var linkedObjectInstance = { };

    var findLinkedObject = function(name, self, includeToBeLinked) {
        if(!self.$$linkedModules) {
            self.$$linkedModules = linkedModules(self.$$moduleName);
        }
        for(var propt in self.$$linkedModules) {
            result = self.$$linkedModules[propt].$$linkedObjects[name];
            var result = self.$$linkedModules[propt].$$linkedObjects[name];
            if(result) {
                if(result.$$params.internal && self.$$moduleName != result.$$moduleName) muuvyte.throwError('linked object <' + name + '> defined as internal');
                if(!includeToBeLinked && result.$$params.toBeLinked) muuvyte.throwError('linked object <' + name + '> must be linked');

                return result;
            }
        }
        muuvyte.throwError('linked object <' + name + '> undefined');
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
        }

        return findLinkedObject(name, this);

//        for(var propt in this.$$linkedModules) {
//            result = this.$$linkedModules[propt].$$linkedObjects[name];
//            var result = this.$$linkedModules[propt].$$linkedObjects[name];
//            if(result) {
//                if(result.$$params.internal && this.$$moduleName != result.$$moduleName) muuvyte.throwError('linked object <' + name + '> defined as internal');
//                if(result.$$params.toBeLinked) muuvyte.throwError('linked object <' + name + '> must be linked');
//
//                return result;
//            }
//        }
//        muuvyte.throwError('linked object <' + name + '> undefined');
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

//muuvyte.baseLinkedObject({item1: 'item1'});
//console.log(muuvyte);
//muuvyte.module('module1').baseLinkedObject({item2: 'item2'});
//console.log(muuvyte.module('module1'));

