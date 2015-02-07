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
	});