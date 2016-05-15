var $msq = $msq || {};

(function(msq){
    'use strict';
    msq.$inject = function(injection) {
        return function() {
            this.$inject(injection);
        };
    };

    msq.baseLinkedObject({
        $inject: function(injection) {
            var module = this.$$module;
            var f = module.$findLinkedObjectInModule(module, 'object3');
        }
    });
})($msq);
