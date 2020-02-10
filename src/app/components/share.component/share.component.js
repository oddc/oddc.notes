(function () {
    'use strict';

    angular.module('oddc.notes')
        .component('share', {
            templateUrl : 'src/app/components/share.component/share.component.html',
            controller : shareController,
            controllerAs : 'ctrl'
        });

        shareController.$inject = ['widgetState', '$state', 'odNotes', '$stateParams'];

        function shareController(widgetState, $state, odNotes, $stateParams) {
            var self = this;
            self.$state = $state;
            self.noteId = $stateParams.id;
            self.note   = null;
            self.users  = [];
            self.loaded = false;
            self.switch = false;


            widgetState.setBackButtonState('note', { id: self.noteId });


            self.$onInit = function () {
                odNotes.loadNote(self.noteId).then(function(response) {
                    self.note = response;

                    odNotes.readUsers().then(function (response) {
                        angular.forEach(response, function(obj) {
                            if (self.note.userId !== obj.openId) {
                                obj['shared'] = isShared(obj);
                                self.users.push(obj);
                            }
                        });

                        self.loaded = true;
                    });
                });
            };


            self.getImage = function(user) {
                if (user.image === undefined || user.image === '') {
                    return 'ressources/images/default_user.png';
                }
                return user.image;
            };


            self.back = function () {
                widgetState.go('note', { id: self.noteId });
            };


            self.save = function () {
                self.note['readingUserIds'] = [];
                angular.forEach(self.users, function(obj) {
                    if (obj.shared) {
                        self.note.readingUserIds.push(obj.openId);
                    }
                });

                odNotes.updateNote(self.note).then(function (response) {
                    self.back();
                });
            };


            function isShared(user) {
                if (self.note.readingUserIds === undefined) {
                    return false;
                }

                return (self.note.readingUserIds.indexOf(user.openId) > -1);
            }

        }

})();