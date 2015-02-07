angular.module('starter.modals', [])
	.factory('GoalEdit', function( $ionicModal, $rootScope, Goals) {
		$scope = $rootScope.$new(true)
		$ionicModal.fromTemplateUrl('templates/goal-edit.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});

		$scope.submit = function(form) {
			angular.isUndefined($scope.goal.id)
				? Goals.create(angular.copy($scope.goal))
				: Goals.update(angular.copy($scope.goal));
			$scope.modal.hide();
			form && (form.$submitted = false);
		};

		return {
			open: function(goal) {
				$scope.goal = goal ? angular.copy(goal) : {};
				$scope.modal.show();
			}
		}
	});