myApp.controller('ItemsCtrl', function ($scope, cartFactory, itemFactory, items, $stateParams) {
	$scope.header = $stateParams.category || 'all';
	$scope.formItem = {
		category: $stateParams.category
	};
	$scope.items = items;


	$scope.formSubmitted = function () {
		if ($scope.formItem._id) {
			itemFactory.updateItem($scope.formItem);
		} else {
			itemFactory.createItem($scope.formItem).then(function () {
				$scope.notification = 'New item successfully added!';
				$scope.formItem = {
					category: $stateParams.category
				};
			});
		}
	}

	$scope.deleteItem = function (id) {
		itemFactory.deleteItem(id);
	}

	$scope.editItem = function (item) {
		$scope.formItem = item;
	}

	$scope.itemInCategory = function (item) {
		return (!$stateParams.category || (item.category == $stateParams.category));
	}

	$scope.addToCart = function (item) {
		console.log(item);
		cartFactory.addToCart(item);
		$scope.$emit('itemAdded');
	}

	$scope.cheapItem = $scope.items.filter($scope.itemInCategory).sort(function (a,b) {
		return a.price > b.price;
	})[0];
});