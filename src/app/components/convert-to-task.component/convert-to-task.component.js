(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('convertToTask', {
            templateUrl : 'src/app/components/convert-to-task.component/convert-to-task.component.html',
            controller : convertToTaskController,
            controllerAs : 'ctrl'
        });

        convertToTaskController.$inject = ['$stateParams', '$timeout', 'odNotes', 'widgetState'];

        function convertToTaskController($stateParams, $timeout, odNotes, widgetState) {
            var self = this;
            self.noteId = $stateParams.id;
            self.loaded = false;
            self.note = null;
            self.tasklist = [];
            self.tasklistId = 'null';
            self.showNewAdded = false;


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                odNotes.loadNote(self.noteId).then(function(note) {
                    self.note = note;

                    odNotes.getTaskLists().then(function (tasklist) {
                        angular.forEach(tasklist, function(obj) {
                            if(obj.isDefault === undefined || obj.isDefault === false) {
                                self.tasklist.push(obj);
                            }
                        });
                        self.loaded = true;
                    });
                });
            };


            self.cancel = function () {
                widgetState.go('note', { id: self.noteId });
            };


            self.convert = function () {
                if (self.tasklistId === 'null') {
                    return;
                }

                odNotes.convertToTask(self.noteId, self.tasklistId).then(function () {
                    self.showNewAdded = true;
                    $timeout(function () {
                        widgetState.go('note', { id: self.noteId });
                    }, 2000);
                });
            };
        }

})();