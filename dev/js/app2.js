(function() {
    var app = angular.module('mainPage', [ 'appbar-directives' ]);

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

    var sections = [
        {name: "About", icon: "person", iColor: "blue-text", href: "about", templateUrl: "about.html", dName: "aboutMe"},
        {name: "Experience", icon: "history", iColor: "green-text text-accent-3", href: "work", templateUrl: "experience.html", dName:"experience"},
        {name: "Projects", icon: "work", iColor: "yellow-text", href: "proj", templateUrl: 'projects.html', dName: "projects"},
        {name: "Skills", icon: "star", iColor: "orange-text", href: "skills", templateUrl: 'skills.html', dName: "skills"},
        {name: "Education", icon: "school", iColor: "red-text", href: "edu", templateUrl: 'education.html', dName: "education"}
    ];

    sections.forEach(function(section) {
        app.directive(section.dName, function() {
            return {
                restrict: 'E',
                templateUrl: "html/" + section.templateUrl
            };
        });
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
            }
            if (!down && scroll < $scope.scroll) {
                $scope.fixed['toolbar-receded'] = false;
                down = true;
            }

            $scope.scroll = scroll;
            scopeService.safeApply($scope);
        }

        w.on('scroll', handler);
    }]);

    app.directive("navBar", function() {
        return {
            restrict: 'AE',
            templateUrl: 'nav-bar.html',
            scope: {
                posClass: '=posClass'
            },
            link: function(scope, element, attrs) {
                scope.sections = sections;
            }
        };
    });

    app.directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, $elm, attrs) {
                var idToScroll = attrs.ngHref;
                console.log(idToScroll);
                $elm.on('click', function() {
                    var $target;
                    if (idToScroll) {
                        $target = $(idToScroll);
                    } else {
                        $target = $elm;
                    }
                    $("body").animate({scrollTop: $target.offset().top - 100}, "slow");
                });
            }
        }
    });

})();