(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('fileList', {
            templateUrl : 'src/app/components/file-management.component/file-list.component/file-list.component.html',
            controller : fileListController,
            controllerAs : 'ctrl'
        });

        fileListController.$inject = ['widgetState', '$state', 'odNotes', '$stateParams', '$sessionStorage'];

        function fileListController(widgetState, $state, odNotes, $stateParams, $sessionStorage) {
            var self = this;
            self.$state = $state;
            self.noteId = $stateParams.id;
            self.loaded = false;
            self.error  = '';
            self.files  = [];


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                odNotes.getDocuments(self.noteId).then(function (result) {
                    if (!result.error) {
                        self.files = result;
                        self.loaded = true;
                    }
                    else {
                        self.error = result.message;
                        self.loaded = true;
                    }
                });
            };


            self.uploadFile = function () {
                widgetState.go('files.upload', { id: self.noteId });
            };


            self.openFile = function (file) {
                $sessionStorage.file = { noteid: self.noteId, file: file};
                widgetState.go('files.details', { id: self.noteId, fileid: file.id });
            };


            self.canSave = function () {
                if (self.isNew) {
                    return true;
                }

                if (odNotes.getCurrentUser() === null || $sessionStorage.noteOpenId === undefined) {
                    return false;
                }

                return $sessionStorage.noteOpenId === odNotes.getCurrentUser().openId;
            };


        }

})();