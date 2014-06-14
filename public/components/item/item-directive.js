myApp.directive('item', function () {
	return {
		scope: {
			item: "=info",
			special: "@",
			addToCart: "&"
		},
		restrict: 'E',
		templateUrl: '/components/item/item.html',
		link: function (scope, element, attrs) {
			if(scope.special) {
				scope.itemTitle = '***BONUS*** ' + scope.item.name + ' ***BONUS***';
			} else {
				scope.itemTitle = scope.item.name
			}
		}
	}
})