'use strict';

angular.module('core').controller('HomeController', ['$scope', 'ListingsService', 'Authentication',
  function ($scope, Authentication, ListingsService) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    $scope.listings = ListingsService;
    console.log('Auth: ', Authentication);
    // console.log('listings: ', listings);
  }
]);
