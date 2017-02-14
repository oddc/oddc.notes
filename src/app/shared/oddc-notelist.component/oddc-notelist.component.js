(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('oddcNotelist', {
            templateUrl: 'src/app/shared/oddc-notelist.component/oddc-notelist.component.html',
            controller: ['odNotes','$state', function(odNotes, $state) {
                var self = this;
                self.contentLoaded = false;
                odNotes.loadNotes()
                    .then(function(result) {
                        self.notes = result;
                        self.contentLoaded = true;
                    });
                self.select = function(noteId) {
                    $state.go('edit', {id: noteId});
                };
            }]
        });


})();