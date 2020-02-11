(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('list', {
            templateUrl : 'src/app/components/list.component/list.component.html',
            controller: listController,
            controllerAs : 'ctrl'
        });

        listController.$inject = ['$state', 'odNotes'];

        function listController($state, odNotes) {
            var self = this;
            self.notes = [];
            self.contentLoaded = false;
            self.error = false;


            self.$onInit = function () {
                odNotes.loadCurrentUser();

                odNotes.loadNotes().then(function(result) {
                    if(result.error === undefined) {
                        self.notes = result;
                    }
                    else {
                        self.error = true;
                    }

                    self.contentLoaded = true;
                });
            };


            self.select = function(noteId) {
                $state.go('note', { id: noteId });
            };


            self.openNewNode = function () {
                $state.go('note', { id: 'new' });
            };


            self.getTitle = function (note) {
                if (note.title === '') {
                    var title = note.body.substring(0, 50);
                    if (note.body.length > 50) {
                        title += ' ...';
                    }
                    return title;
                }
                return note.title;
            };

        }

})();