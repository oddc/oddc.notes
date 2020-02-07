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
                .state('note-delete', {
                    url: '/note/:id/delete',
                    template: '<delete-confirm></delete-confirm>'
                })
                .state('share', {
                    url: '/share/:id',
                    template: '<share></share>'
                });

            $urlRouterProvider.otherwise('/');

        }]);

})();