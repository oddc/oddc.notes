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
        self.nodeId = $stateParams.id;
        self.fileId = $stateParams.fileid;
        self.file = null;


        function $onInit() {
            if ($sessionStorage.file !== undefined) {
                if ($sessionStorage.file.noteid === self.nodeId && $sessionStorage.file.file.id === self.fileId) {
                    self.file = $sessionStorage.file.file;
                }
            }
        }


        self.cancel = function () {
            widgetState.go('files.list', { id: self.nodeId });
        };


        self.delete = function () {
            widgetState.go('tasks.filedelete', { listid: $stateParams.listid, taskid: $stateParams.taskid, fileid: $stateParams.fileid });
        };
    }



})();