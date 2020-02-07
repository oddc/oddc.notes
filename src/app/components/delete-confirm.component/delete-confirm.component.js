(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('deleteConfirm', {
            templateUrl : 'src/app/components/delete-confirm.component/delete-confirm.component.html',
            controller : shareController,
            controllerAs : 'ctrl'
        });

        shareController.$inject = ['$stateParams', 'odNotes', 'widgetState'];

        function shareController($stateParams, odNotes, widgetState) {
            var self = this;
            self.loaded = false;
            self.note = null;
            self.noteId = $stateParams.id;


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