(function () {
  'use strict';

  angular
    .module('listings')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Listings',
      state: 'listings',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'listings', {
      title: 'Show All the Listings',
      state: 'listings.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'listings', {
      title: 'Create Listing To Sell',
      state: 'listings.create',
      roles: ['user']
    });
  }
})();
