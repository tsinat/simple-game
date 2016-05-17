(function () {
  'use strict';

  angular
    .module('listings')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('listings', {
        abstract: true,
        url: '/listings',
        template: '<ui-view/>'
      })
      .state('listings.list', {
        url: '',
        templateUrl: 'modules/listings/client/views/list-listings.client.view.html',
        controller: 'ListingsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'View All Listings'
        }
      })
      .state('listings.create', {
        url: '/create',
        templateUrl: 'modules/listings/client/views/form-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: newListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Listings Create'
        }
      })
      .state('listings.edit', {
        url: '/:listingId/edit',
        templateUrl: 'modules/listings/client/views/form-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Listing {{ listingResolve.name }}'
        }
      })
      .state('listings.view', {
        url: '/:listingId',
        templateUrl: 'modules/listings/client/views/view-listing.client.view.html',
        controller: 'ListingsController',
        controllerAs: 'vm',
        resolve: {
          listingResolve: getListing
        },
        data:{
          pageTitle: 'Listing {{ articleResolve.name }}'
        }
      });
  }

  getListing.$inject = ['$stateParams', 'ListingsService'];

  function getListing($stateParams, ListingsService) {
    return ListingsService.get({
      listingId: $stateParams.listingId
    }).$promise;
  }

  newListing.$inject = ['ListingsService'];

  function newListing(ListingsService) {
    return new ListingsService();
  }
})();
