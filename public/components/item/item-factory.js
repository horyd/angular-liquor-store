myApp.factory('itemFactory', function ($http, $q) {
	var returnObject = {};
	var items = [];

	returnObject.deleteItem = function (id) {
		$http({
			method: 'DELETE',
			url: '/api/items/' + id
		}).then(function(data) {
			for (var i=0; i< items.length;i++) {
				if (items[i]._id == id) items.splice(i,1);
			}
			alert('Item deleted!');
		})
	}

	returnObject.updateItem = function (item) {
		$http({
			method: 'PUT',
			url: '/api/items/' + item._id,
			data: {
				item: item
			}
		}).then(function (data) {
			item = data.data;
		})
	}

	returnObject.createItem = function (item) {
		var promise = $http({
			method: 'POST',
			url: '/api/items',
			data: {
				item: item
			}
		});

		promise.then(function (data) {
			items.push(data.data);
		});

		return promise;
	}

	returnObject.getItems = function () {

		if (items.length) return items;

		var defer = $q.defer();

		$http({
			method:'GET',
			url: '/api/items'
		}).then(function (data) { //success
			console.log(data);

			items = data.data;
			defer.resolve(data.data);
		}, function () { //error
			defer.reject();
		});

		return defer.promise;
	}

	return returnObject;
})