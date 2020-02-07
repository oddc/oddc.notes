(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('fileList', {
            templateUrl : 'src/app/components/file-management.component/file-list.component/file-list.component.html',
            controller : fileListController,
            controllerAs : 'ctrl'
        });

        fileListController.$inject = ['widgetState', '$state', 'odNotes', '$stateParams'];

        function fileListController(widgetState, $state, odNotes, $stateParams) {
            var self = this;
            self.$state = $state;
            self.noteId = $stateParams.id;
            self.loaded = false;
            self.error  = '';
            self.files  = [];


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                self.loaded = true;
            };




        }

})();