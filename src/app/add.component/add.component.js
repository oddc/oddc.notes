(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('add', {
            templateUrl : 'src/app/add.component/add.component.html',
            controller : addController,
            controllerAs : 'addController'
        });

        addController.$inject = ['widgetState', '$state', 'odNotes'];

        function addController(widgetState, $state, odNotes) {
            var self = this;
            self.$state = $state;
            self.newNote = {title:'', body:''};
            self.addNote = function() {
                odNotes.addNote(self.newNote).then(function(){
                    $state.go('list');
                });
            };
            widgetState.setBackButtonState('list');
        }

})();