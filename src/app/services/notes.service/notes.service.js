(function () {
    'use strict';

    angular.module('widgetbuilder')
        .factory('odNotes', ['$log', 'widgetServices', '$rootScope', '$sessionStorage', function ($log, widgetServices, $rootScope, $sessionStorage) {
            var notes = [];

            return {
                loadNotes: loadNotes,
                loadNote: loadNote,
                addNote : addNote,
                updateNote : updateNote,
                deleteNote : deleteNote,
                readUsers: readUsers,
                getDocuments: getDocuments,
                getTaskLists: getTaskLists,
                convertToTask: convertToTask,
                loadCurrentUser: loadCurrentUser,
                getCurrentUser: getCurrentUser
            };

            function addNote(note) {
                return widgetServices.callService('addNote', note).then(function(response){
                    notes.push(response.data);
                    $rootScope.$broadcast('rebuild:scrollbars');
                });
            }

            function loadNotes() {
                return widgetServices.callService('loadNotes').then(function(response){
                     notes = response;
                     $rootScope.$broadcast('rebuild:scrollbars');
                     return notes;
                }, errorMsg);
            }

            function loadNote(noteId) {
                return widgetServices.callService('loadNote', {id : noteId}).then(function(response){
                    return response;
                });
            }

            function updateNote(note) {
                return widgetServices.callService('updateNote', note).then(function(response){
                    return response;
                });
            }

            function deleteNote(noteId) {
                return widgetServices.callService('deleteNote', noteId).then(function(response){
                    return response;
                });
            }

            function readUsers() {
                return widgetServices.callService('readUsers').then(function(response){
                    return response;
                });
            }

            function getDocuments(noteId) {
                return widgetServices.callService('getDocuments', { id: noteId}).then(function (response) {
                    return response;
                })
            }

            function getTaskLists() {
                return widgetServices.callService('getTaskLists').then(function (response) {
                    return response;
                });
            }

            function convertToTask(noteId, taskListId) {
                return widgetServices.callService('convertToTask', { id: noteId, taskListId: taskListId }).then(function (response) {
                    return response;
                });
            }

            function loadCurrentUser() {
                if ($sessionStorage.currentUser === undefined) {
                    widgetServices.callService('currentUser').then(function (response) {
                        $sessionStorage.currentUser = response;
                    });
                }
            }

            function getCurrentUser() {
                return $sessionStorage.currentUser === undefined ? null : $sessionStorage.currentUser;
            }

            function errorMsg(error) {
                return {error: true, msg: error};
            }


        }]);

})();