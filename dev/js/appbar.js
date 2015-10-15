(function() {
    var app = angular.module("appbar-directives", []);

    app.service('scopeService', function() {
        return {
            safeApply: function ($scope, fn) {
                var phase = $scope.$root.$$phase;
                if (phase == '$apply' || phase == '$digest') {
                    if (fn && typeof fn === 'function') {
                        fn();
                    }
                } else {
                    $scope.$apply(fn);
                }
            },
        };
    });

    app.controller("appBarController", ['scopeService', '$scope', function(scopeService, $scope) {
        $scope.fixed = {"toolbar-fixed" : true, "toolbar-receded": false};
        $scope.notFixed = {"toolbar-fixed": false, "toolbar-receded": false};

        var w = $(window);
        $scope.scroll = w.scrollTop();
        var down = true;

        var handler = function() {
            var scroll = w.scrollTop();
            if (down && scroll > 100 && scroll > $scope.scroll) {
                $scope.fixed['toolbar-receded'] = true;
                down = false;
                scopeService.safeApply($scope);
            }
            if (!down && scroll < $scope.scroll) {
                $scope.fixed['toolbar-receded'] = false;
                down = true;
                scopeService.safeApply($scope);
            }

            $scope.scroll = scroll;
        }

        w.on('scroll', handler);
    }]);

    app.directive("navBar", ['$http', '$timeout', function($http, $timeout) {
        return {
            restrict: 'AE',
            templateUrl: 'nav-bar.html',
            scope: {
                posClass: '=posClass',
            },
            link: function(scope, element, attrs) {
                scope.sections = [];

                $http.get('/json/sections.json').success(function(data) {
                    scope.sections = data;

                    $timeout(function() {
                        $('.button-collapse').sideNav();
                    });
                });
            }
        };
    }]);

    app.directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm, attrs) {
                var idToScroll = attrs.scrollId;
                $elm.on('click', function() {
                    var $target;
                    if (idToScroll) {
                        $target = $(idToScroll);
                    } else {
                        $target = $elm;
                    }
                    $("body").animate({
                        scrollTop: idToScroll == "#about" ? 0 : $target.offset().top
                    }, "slow");
                });
            }
        }
    });
})();