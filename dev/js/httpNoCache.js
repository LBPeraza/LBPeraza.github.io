(function() {
    var app = angular.module("http-no-cache", []);

    app.service('httpNoCache', ['$http', function($http) {
        return {
            get: function(url, config) {
                if (config) {
                    if (config.params) {
                        config.params['adfkjasbdv'] = new Date().getTime();
                    } else {
                        config.params = {
                            'adfkjasbdv': new Date().getTime()
                        }
                    }
                } else {
                    config = {
                        params: { 'adfkjasbdv': new Date().getTime() }
                    }
                }
                return $http.get(url, config);
            }
        }
    }]);
})();