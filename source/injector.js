var $msq = $msq || {};

(function(msq){
    'use strict';
    msq.$inject = function(injection) {
        return function() {
            this.$inject(injection);
        };
    };

    var asArray = function(toBeArray) {
        if(toBeArray instanceof Array === false) {
            toBeArray = [toBeArray];
        }
        return toBeArray;
    };

    msq.baseLinkedObject({
        $inject: function(injection) {
            injection =  asArray(injection);
            var method = injection.pop();
            var linkedObjects = [];
            var module = this.$$module;
            for(var i=0; i<injection.length; i++) {
                linkedObjects.push(module.$findLinkedObjectInModule(module, injection[i]));
            }
            return method.apply(this, linkedObjects);
        }
    });
})($msq);
