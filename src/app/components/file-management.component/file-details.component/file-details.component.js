(function () {

    'use strict';

    angular.module('oddc.notes')
        .component('filesDetails', {
            templateUrl: 'src/app/components/file-management.component/file-details.component/file-details.component.html',
            controller: filesDetailsController,
            controllerAs: 'ctrl',
        });

    filesDetailsController.$inject = ['$stateParams', 'widgetState', '$sessionStorage'];
    function filesDetailsController($stateParams, widgetState, $sessionStorage) {
        var self = this;
        self.$onInit = $onInit;
        self.noteId = $stateParams.id;
        self.fileId = $stateParams.fileid;
        self.file = null;


        widgetState.setBackButtonState('files.list', { id: self.noteId });


        function $onInit() {
            if ($sessionStorage.file !== undefined || $sessionStorage.file !== null) {
                if ($sessionStorage.file.noteid === self.noteId && $sessionStorage.file.file.id === self.fileId) {
                    self.file = $sessionStorage.file.file;
                }
            }
        }


        self.cancel = function () {
            widgetState.go('files.list', { id: self.noteId });
        };


        self.delete = function () {
            widgetState.go('files.delete', { id: self.noteId, fileid: self.fileId });
        };
    }



})();