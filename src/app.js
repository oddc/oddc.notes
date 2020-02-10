(function () {
    'use strict';

    angular.module('oddc.notes', ['widgetbuilder', 'ngFileUpload', 'ngStorage'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('list', {
                    url: '/',
                    template: '<list></list>'
                })
                .state('note', {
                    url: '/note/:id',
                    template: '<note></note>'
                })
                .state('delete', {
                    url: '/delete/:id',
                    template: '<delete-confirm></delete-confirm>'
                })
                .state('share', {
                    url: '/share/:id',
                    template: '<share></share>'
                })
                .state('files', {
                    url: '/files/:id',
                    template: '<file-management></file-management>'
                })
                .state('files.list', {
                    url: '/list',
                    template: '<file-list></file-list>'
                })
                .state('files.upload', {
                    url: '/upload',
                    template: '<file-upload></file-upload>'
                })
                .state('files.details', {
                    url: '/details/:fileid',
                    template: '<files-details></files-details>'
                })
                .state('files.delete', {
                    url: '/delete/:fileid',
                    template: '<file-delete></file-delete>'
                })
                .state('convert', {
                    url: '/convert/:id',
                    template: '<convert-to-task></convert-to-task>'
                });


            $urlRouterProvider.otherwise('/');

        }]);

})();