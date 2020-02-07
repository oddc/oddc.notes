(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('fileManagement', {
            templateUrl : 'src/app/components/file-management.component/file-management.component.html',
            controller : fileManagementController,
            controllerAs : 'ctrl'
        });

        fileManagementController.$inject = ['widgetState', '$state', 'odNotes', '$stateParams'];

        function fileManagementController(widgetState, $state, odNotes, $stateParams) {
            var self = this;
            self.$state = $state;
            self.noteId = $stateParams.id;
            self.loaded = false;


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                self.loaded = true;
            };




        }

})();