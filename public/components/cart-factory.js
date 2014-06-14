myApp.factory('cartFactory', function() {

	var cart = {};

	cart.cart = [];

	cart.addToCart = function (item) {
		cart.cart.push(item);
	}

	cart.removeFromCart = function (index) {
		cart.cart.splice(index,1);
	}

	cart.costOfCart = function () {
		return cart.cart.reduceRight(function (a, b) {return a + b.price;},0);
	}

	return cart;

});