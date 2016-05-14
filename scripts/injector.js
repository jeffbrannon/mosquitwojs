'use strict';

(function(){

    muuvyte.$inject = function(injection) {
        return function() {
            this.$inject(injection);
        }
    }

    muuvyte.baseLinkedObject({
        $inject: function(injection) {
            console.log(this, injection);
        }
    });
})();
