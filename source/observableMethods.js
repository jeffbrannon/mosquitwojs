var $msq = $msq || {};

(function(msq){
    'use strict';

    var observableMethods = [];

    var observe = function(linkedObjectName, methodName, method) {
        if(!observableMethods[methodName]) {
                observableMethods[methodName] = [];
            }
            observableMethods[methodName].push({
                linkedObjectName: linkedObjectName,
                method: method
            });
    };

    msq.extension.paramExtend.observableMethods = function(methods, linkedObject, result) {
        if(methods instanceof Array === false) {
            methods = [methods];
        }
        for(var index in methods) {
            observe(linkedObject.$$name, methods[index], result[methods[index]]);
        }
    };

    msq.baseLinkedObject({
        $next: function(methodName, param) {
            for(var index in observableMethods[methodName]) {
                var method = observableMethods[methodName][index].method;
                method(param);
            }
        },
        $observe: function(linkedObjectName, methodName) {
            observe(linkedObjectName, methodName, this[methodName]);
        },
        $unobserve: function(linkedObjectName, methodName) {
            var methodData = observableMethods[methodName];
            for(var index in methodData) {
                if(methodData[index].linkedObjectName === linkedObjectName) {
                    methodData.splice(index, 1);
                    break;
                }
            }
        }
    });

})($msq);
