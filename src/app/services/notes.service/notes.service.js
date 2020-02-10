(function () {
    'use strict';

    angular.module('widgetbuilder')
        .factory('odNotes', ['$log', 'widgetServices', '$rootScope', function ($log, widgetServices, $rootScope) {
            var notes = [];

            return {
                loadNotes: loadNotes,
                loadNote: loadNote,
                addNote : addNote,
                updateNote : updateNote,
                deleteNote : deleteNote,
                readUsers: readUsers,
                getDocuments: getDocuments
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
                return widgetServices.callService('getDocuments', { id: noteId}, function (response) {
                    return response;
                });
            }

            function errorMsg(error) {
                return {error: true, msg: error};
            }


        }]);

})();