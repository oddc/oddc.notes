(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('oddcNoteeditor', {
            bindings : {
                note : '=',
                onDelayedNoteChange : '&'
            },
            templateUrl: 'src/app/shared/oddc-noteeditor.component/oddc-noteeditor.component.html',
            controller: ['$timeout', function($timeout) {
                var self = this;

                self.delayedNoteChange = function() {
                    $timeout.cancel(self.timer);
                    self.timer = $timeout(function() {
                        self.onDelayedNoteChange();
                    },1000);
                };

            }]
        });
})();