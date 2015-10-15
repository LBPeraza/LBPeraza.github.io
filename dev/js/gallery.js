(function () {

    console.log("???");

    var app = angular.module('project-gallery', []);

    app.directive('gallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'html/gallery-template.html',
            scope: {
                gallery: '=gallery'
            },
            controller: ['$scope', function($scope) {
                console.log("woohoo");
                $scope.img = 0;

                this.label = $scope.gallery.name;
                this.name = $scope.gallery.modalName;

                this.setImg = function(i) {
                    console.log(i);
                    $scope.img = i;
                }
                this.getImg = function() {
                    return $scope.gallery.imgs[$scope.img].src;
                }

                this.openModal = function() {
                    var id = $scope.gallery.modalName + '-gallery';
                    console.log('#' + id);
                    $('#' + id).openModal();
                }
            }],
            controllerAs: 'galleryCtrl'
        };
    });

    app.controller('GalleryTester', ['$http', '$scope', '$timeout', function($http, $scope, $timeout) {
        var gal = this;
        gal.galleries = [];

        $http.get('/dev/json/gallery-test.json').success(function(data) {
            gal.galleries = data;
            $scope.galleries = data;

            $timeout(function() {
                $('.modal-trigger').leanModal();
            });

        });
    }]);

})();