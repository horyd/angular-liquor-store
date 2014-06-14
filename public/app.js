var myApp = angular.module('myApp', ['ui.router']);
			
myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise('/items?category=beer');

	$stateProvider
	.state('main', {
		abstract: true,
		views: {
			'main': {
				templateUrl: 'main/main.html',
				controller: 'MainCtrl'
			}
		}
	})
	.state('main.items', {
		url: '/items?category',
		views: {
			'content': {
				templateUrl: 'main/content/items/items.html',
				controller: 'ItemsCtrl'
			}
		},
		resolve: {
			items: function (itemFactory) {
				return itemFactory.getItems();
			}
		}
	})
	.state('main.cart', {
		url: '/cart',
		views: {
			'content': {
				templateUrl: 'main/content/cart/cart.html',
				controller: 'CartCtrl'
			}
		}
	});
});