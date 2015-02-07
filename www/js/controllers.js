angular.module('starter.controllers', [])
	.controller('GoalsCtrl', function ($scope, Goals, $ionicPopover, GoalEdit, $interval) {
		$scope.goalCreate = GoalEdit;
		$ionicPopover.fromTemplateUrl('templates/goals-options-popover.html', {
			scope: $scope
		}).then(function (popover) {
			$scope.options = popover;
		});
		$scope.$on('$destroy', function () {
			$scope.options.remove();
		});
		$interval(function () {
			$scope.goals[0].progress = Math.random() * 100;
		}, 1000);
		$scope.goals = Goals.list();
		$scope.onReorder = function (fromIndex, toIndex) {
			Goals.reorder(fromIndex, toIndex)
		};
	})
	.controller('GoalTasksCtrl', function ($scope, $stateParams, Goals, Tasks, $ionicPopover, $location, $ionicPopup, GoalEdit) {
		$scope.goalEdit = GoalEdit;
		$scope.goal = Goals.get($stateParams.goalId);
		$scope.tasks = Tasks.list();
		$ionicPopover.fromTemplateUrl('templates/goal-options-popover.html', {
			scope: $scope
		}).then(function (popover) {
			$scope.options = popover;
		});
		$scope.$on('$destroy', function () {
			$scope.options.remove();
		});
		$scope.removeGoal = function () {
			$ionicPopup.confirm({
				title: 'Confirm goal delete',
				template: 'You give up with this goal?'
			}).then(function(res) {
				if(res) {
					Goals.remove($scope.goal);
					$location.path('/tab/goals')
				}
			});
		};
	})
	;

;
