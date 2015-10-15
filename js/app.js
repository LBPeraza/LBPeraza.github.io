(function() {
    var app = angular.module('mainPage', [ 'appbar-directives', 'http-no-cache', 'project-gallery' ]);

    app.controller("footerController", ['httpNoCache', function($http) {
        var footer = this;
        footer.lis = [];

        $http.get('/json/footer.json').success(function(data) {
            footer.lis = data;
        });
    }]);

    app.directive("aboutMe", function() {
        return {
            restrict: 'E',
            templateUrl: 'html/about.html',
            controller: ['httpNoCache', function($http) {
                var about = this;
                about.header = "";
                about.lis = [];

                $http.get('/json/about.json').success(function(data) {
                    about.header = data.header;
                    about.lis = data.lis;
                });
            }],
            controllerAs: 'aboutCtrl'
        }
    });

    app.directive("experience", function() {
        return {
            restrict: 'E',
            templateUrl: 'html/experience.html',
            controller: ['httpNoCache', function($http) {
                var work = this;
                work.jobs = [];

                $http.get('/json/experience.json').success(function(data) {
                    work.jobs = data;
                });
            }],
            controllerAs: 'workCtrl'
        };
    });

    app.directive("projects", function() {
        return {
            restrict: 'E',
            templateUrl: 'html/projects.html',
            controller: ['httpNoCache', function($http) {
                var projects = this;
                projects.projects = [];

                this.brColor = function(color) {
                    return {'border-left': '6px solid ' + color};
                }

                this.makeTextColor = function(color) {
                    return {color: color};
                }

                $http.get('/json/projects.json').success(function(data) {
                    projects.projects = data;
                });
            }],
            controllerAs: 'projCtrl'
        };
    });

    app.directive("skills", function() {
        return {
            restrict: 'E',
            templateUrl: 'html/skills.html',
            controller: ['httpNoCache', function($http) {
                var skills = this;
                skills.skillLevels = [];

                $http.get('/json/skills.json').success(function(data) {
                    skills.skillLevels = data;
                });
            }],
            controllerAs: 'skillsCtrl'
        };
    });

    app.directive("education", function() {
        return {
            restrict: 'E',
            templateUrl: 'html/education.html',
            controller: ['httpNoCache', '$timeout', function($http, $timeout) {
                var edu = this;
                edu.institutions = [];

                this.isActive = function(index, inst) {
                    return {
                        'active': index === inst.activeCourse,
                    }
                }

                this.setActive = function(index, inst) {
                    inst.activeCourse = index;
                }

                $http.get('/json/education.json').success(function(data) {
                    edu.institutions = data;

                    $timeout(function() {
                        $('.courses').each(function() {
                            var $this = $(this);

                            $this.find('.course-desc').height($this.find('ul').height());
                        });
                    });
                });

            }],
            controllerAs: 'eduCtrl'
        };
    });

})();
