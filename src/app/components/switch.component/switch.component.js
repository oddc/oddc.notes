(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('switchBtn', {
            templateUrl : 'src/app/components/switch.component/switch.component.html',
            controller : switchBtnController,
            controllerAs : 'ctrl',
            bindings: {
                isOn: '='
            }
        });

        switchBtnController.$inject = [];

        function switchBtnController() {
            var self = this;
            self.loaded = false;


            self.$onInit = function () {
                self.loaded = true;
            };
        }

})();