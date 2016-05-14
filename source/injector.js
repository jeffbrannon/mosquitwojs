var msqjs = msqjs || {};

(function(msq){
    'use strict';
    msq.$inject = function(injection) {
        return function() {
            this.$inject(injection);
        };
    };

    msq.baseLinkedObject({
        $inject: function(injection) {
            //console.log(this, injection);
        }
    });
})(msqjs);
