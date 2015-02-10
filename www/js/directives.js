function isEmpty(value) {
	return angular.isUndefined(value) || value === '' || value === null || value !== value;
}

angular.module('starter.directives', [])
	.directive('lineProgress', function() {
		return {
			restrict: 'A',
			template: '',
			scope: {
				lineProgress: '@'
			},
			link: function(scope, element, attr) {
				scope.$watch('lineProgress', function(newValue) {
					element.css({width: newValue + '%'});
				});
			}
		}
	})
	.directive('ngMin', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				scope.$watch(attr.ngMin, function(){
					elem.min = scope.$eval(attr.ngMin);
				});
			}
		};
	})
	.directive('ngMax', function() {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function(scope, elem, attr, ctrl) {
				scope.$watch(attr.ngMax, function(){
					if (ctrl.$isDirty) ctrl.$setViewValue(ctrl.$viewValue);
				});
				var maxValidator = function(value) {
					var max = scope.$eval(attr.ngMax) || Infinity;
					if (!isEmpty(value) && value > max) {
						ctrl.$setValidity('ngMax', false);
						return undefined;
					} else {
						ctrl.$setValidity('ngMax', true);
						return value;
					}
				};

				ctrl.$parsers.push(maxValidator);
				ctrl.$formatters.push(maxValidator);
			}
		};
	});