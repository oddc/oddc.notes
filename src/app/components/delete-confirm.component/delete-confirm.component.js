(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('deleteConfirm', {
            templateUrl : 'src/app/components/delete-confirm.component/delete-confirm.component.html',
            controller : deleteConfirmController,
            controllerAs : 'ctrl'
        });

        deleteConfirmController.$inject = ['$stateParams', 'odNotes', 'widgetState'];

        function deleteConfirmController($stateParams, odNotes, widgetState) {
            var self = this;
            self.loaded = false;
            self.note = null;
            self.noteId = $stateParams.id;


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                odNotes.loadNote(self.noteId).then(function(response) {
                    self.note = response;
                    self.loaded = true;
                });
            };


            self.cancel = function () {
                widgetState.go('note', { id: self.noteId });
            };


            self.delete = function () {
                odNotes.deleteNote({id : $stateParams.id}).then(function(){
                    widgetState.go('list');
                });
            };
        }

})();