angular.module('starter.modals', [])
	.factory('GoalEdit', function( $ionicModal, $rootScope, Goals) {
		var $scope = $rootScope.$new(true)
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
				$scope.minDate = new Date();
				$scope.modal.show();
			}
		}
	})
	.factory('TaskEdit', function( $ionicModal, $rootScope, Tasks) {
		var $scope = $rootScope.$new(true)
		$ionicModal.fromTemplateUrl('templates/task-edit.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.modal = modal;
		});

		$scope.submit = function(form) {
			angular.isUndefined($scope.task.id)
				? Tasks.create(angular.copy($scope.task))
				: Tasks.update(angular.copy($scope.task));
			$scope.modal.hide();
			form && (form.$submitted = false);
		};

		return {
			open: function(goal, task) {
				$scope.task = task ? angular.copy(task) : {goalId: goal.id};
				$scope.goal = goal;
				$scope.minDate = new Date();
				$scope.modal.show();
			}
		}
	});