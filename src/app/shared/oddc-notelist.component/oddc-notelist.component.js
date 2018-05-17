(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('oddcNotelist', {
            templateUrl: 'src/app/shared/oddc-notelist.component/oddc-notelist.component.html',
            controller: ['odNotes','$state', function(odNotes, $state) {
                var self = this;
                self.notes = [];
                self.contentLoaded = false;
                self.error = false;

                odNotes.loadNotes()
                    .then(function(result) {
                        if(result.error === undefined) {
                            self.notes = result;
                        }
                        else {
                            self.error = true;
                        }

                        self.contentLoaded = true;
                    });
                self.select = function(noteId) {
                    $state.go('edit', {id: noteId});
                };
            }]
        });


})();