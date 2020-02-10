(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('note', {
            templateUrl : 'src/app/components/note.component/note.component.html',
            controller : noteController,
            controllerAs : 'ctrl'
        });

        noteController.$inject = ['widgetState', '$state', 'odNotes', '$stateParams'];

        function noteController(widgetState, $state, odNotes, $stateParams) {
            var self = this;
            self.$state = $state;
            self.note = { title:'', body:'' };
            self.noteId = $stateParams.id;
            self.isNew = self.noteId === 'new';
            self.loaded = false;
            self.showTitle = false;


            widgetState.setBackButtonState('list');


            self.$onInit = function () {
                if (!self.isNew) {
                    odNotes.loadNote(self.noteId).then(function(response) {
                        self.note = response;
                        console.log(self.note);
                        self.loaded = true;

                        if (self.note.title.trim() !== '') {
                            self.showTitle = true;
                        }
                    });
                }
                else {
                    self.loaded = true;
                }
            };


            self.updateNote = function() {
                odNotes.updateNote(self.note).then(function() {
                    widgetState.go('list');
                });
            };


            self.deleteNote = function() {
                widgetState.go('delete', { id: self.noteId });
            };


            self.addNote = function() {
                odNotes.addNote(self.note).then(function(){
                    widgetState.go('list');
                });
            };


            self.saveNote = function () {
                if (self.isNew) {
                    self.addNote();
                }
                else {
                    self.updateNote();
                }
            };


            self.shareNote = function () {
                widgetState.go('share', { id: self.noteId });
            };


            self.openFileManagement = function () {
                widgetState.go('files.list', { id: self.noteId });
            };


            self.noteToTask = function () {

            };

        }

})();