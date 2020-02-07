(function () {
    'use strict';

    angular.module('oddc.notes', ['widgetbuilder'])

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
                });

            $urlRouterProvider.otherwise('/');

        }]);

})();