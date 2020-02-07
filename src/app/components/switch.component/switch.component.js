(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('switchBtn', {
            templateUrl : 'src/app/components/switch.component/switch.component.html',
            controller : shareController,
            controllerAs : 'ctrl',
            bindings: {
                isOn: '='
            }
        });

        shareController.$inject = [];

        function shareController() {
            var self = this;
            self.loaded = false;


            self.$onInit = function () {
                self.loaded = true;
            };
        }

})();