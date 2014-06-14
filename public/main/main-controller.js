myApp.controller('MainCtrl', function ($scope, cartFactory, $timeout) {
	$scope.cart = cartFactory.cart;
	$scope.costOfCart = cartFactory.costOfCart;
	$scope.cartStyle = {};
	$scope.$on('itemAdded',function (event) {
		$scope.cartStyle = {
			color: "red"
		};
		$timeout(function () {
			$scope.cartStyle = {};
		},360);
	})
});