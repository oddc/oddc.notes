(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('list', {
            templateUrl : 'src/app/list.component/list.component.html',
            controller: ['$state', '$element', '$rootScope', function($state) {
                this.$state = $state;
            }],
            controllerAs : 'listController'
        });

})();