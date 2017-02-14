(function () {
    'use strict';

    angular.module('oddc.notes', ['widgetbuilder'])

        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('list', {
                    url: '/',
                    template: '<list></list>',
                    data: {
                        cssClassNames : 'list'
                    }
                })
                .state('add', {
                    url: '/add',
                    template: '<add></add>',
                    data: {
                        cssClassNames : 'add'
                    }
                })
                .state('edit', {
                    url: '/edit/:id',
                    template: '<edit></edit>',
                    data: {
                        cssClassNames : 'edit'
                    }
                });

            $urlRouterProvider.otherwise('/');

        }]);

})();