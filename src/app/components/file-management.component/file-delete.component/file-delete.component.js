(function () {

    'use strict';

    angular.module('oddc.notes')
        .component('fileDelete', {
            templateUrl: 'src/app/components/file-management.component/file-delete.component/file-delete.component.html',
            controller: filesDeleteController,
            controllerAs: 'ctrl'
        });

    filesDeleteController.$inject = ['$stateParams', '$sessionStorage', 'odNotes', 'widgetState'];
    function filesDeleteController($stateParams, $sessionStorage, odNotes, widgetState) {
        var self = this;
        self.$onInit = $onInit;
        self.error = "";
        self.noteId = $stateParams.id;
        self.fileId = $stateParams.fileid;
        self.note = null;
        self.file = null;


        widgetState.setBackButtonState('files.details', { id: self.noteId, fileid: self.fileId });


        function $onInit() {
            if ($sessionStorage.file !== undefined || $sessionStorage.file !== null) {
                if ($sessionStorage.file.noteid === self.noteId && $sessionStorage.file.file.id === self.fileId) {
                    self.file = $sessionStorage.file.file;
                }
            }

            odNotes.loadNote(self.noteId).then(function (result) {
                self.note = result;
            });
        }


        self.cancel = function () {
            widgetState.go('files.details', { id: self.noteId, fileid: self.fileId });
        };


        self.delete = function () {
            if (self.note === null) {
                return;
            }

            for (var i = 0; i < self.note.documentIds.length; i++) {
                if (self.note.documentIds[i] === self.fileId) {
                    self.note.documentIds.splice(i, 1);
                }
            }

            odNotes.updateNote(self.note).then(function (result) {
                if (!result.error) {
                    $sessionStorage.file = null;
                    widgetState.go('files.list', { id: self.noteId });
                }
            });
        };
    }

})();