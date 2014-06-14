myApp.controller('CartCtrl', function ($scope,cartFactory) {
	$scope.header = 'Cart';
	$scope.removeFromCart = cartFactory.removeFromCart;
});