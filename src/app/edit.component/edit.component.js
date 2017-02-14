(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('edit', {
            templateUrl : 'src/app/edit.component/edit.component.html',
            controller : editController,
            controllerAs : 'editController'
        });

        editController.$inject = ['$scope', 'odNotes', '$stateParams', '$state', 'widgetState'];

        function editController($scope, odNotes, $stateParams, $state, widgetState) {
            var self = this;
            self.loaded = false;

            odNotes.loadNote($stateParams.id).then(function(response){
                self.currentNote = response;
                self.loaded = true;
            });

            self.updateNote = function() {
                odNotes.updateNote(self.currentNote);
            };

            self.deleteNote = function() {
                odNotes.deleteNote({id : $stateParams.id}).then(function(response){
                    $state.go('list');
                });
            };

            widgetState.setBackButtonState('list');
        }
})();