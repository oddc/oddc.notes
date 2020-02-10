(function () {

    'use strict';

    angular.module('oddc.notes')
        .component('fileUpload', {
            templateUrl: 'src/app/components/file-management.component/file-upload.component/file-upload.component.html',
            controller: FileUploadController,
            controllerAs: 'ctrl',
        });

    FileUploadController.$inject = ['odNotes', '$stateParams', 'widgetState', 'Upload'];
    function FileUploadController(odNotes, $stateParams, widgetState, Upload) {
        var self = this;
        self.$onInit = $onInit;
        self.noteId = $stateParams.id;
        self.file = [];
        self.error = '';
        self.updateSuccess = false;
        self.isUploading = false;
        self.progress = 0;
        self.api = '';
        self.docIds = [];
        self.note = null;


        widgetState.setBackButtonState('files.list', { id: self.noteId });


        function $onInit() {
            odNotes.loadNote(self.noteId).then(function (result) {
                self.note = result;
                if (result.documentIds !== undefined) {
                    self.docIds = result.documentIds;
                }
            });


            var apiUrls = {
                DEV: 'http://wildfly.optadata.com:8080',
                TEST: 'https://widgetservice.test.optadata-one.de',
                PROD: 'https://widgetservice.optadata-one.de'
            };

            self.api = apiUrls[CONFIG.ENV];
        }


        self.uploadFiles = function() {
            if (self.file === null) return;

            self.updateSuccess = false;
            self.filename = self.file.name;
            self.isUploading = true;
            Upload.upload({
                url: self.api + '/odone.fileserver/upload',
                autoUpload: true,
                data: {
                    type: 'notice',
                    noteId: self.noteId,
                    file: self.file
                },
                resumeChunkSize: 1000000 // 1MB
            }).then(function (resp) {
                self.isUploading = false;
                self.progress = 0;

                if (resp.status === 200 && resp.data.result === 'success') {
                    saveUpload(resp);
                }

            }, function () {
                self.isUploading = false;
                self.progress = 0;
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                self.progress = progressPercentage;
            });
        };


        function saveUpload(resp) {
            if (self.note === null) {
                return;
            }

            if (self.note.documentIds === undefined) {
                self.note['documentIds'] = [];
            }

            self.note.documentIds.push(resp.data.documentId);
            odNotes.updateNote(self.note).then(function (result) {
               if (!result.error) {
                   self.updateSuccess = true;
               }
            });

        }
    }



})();