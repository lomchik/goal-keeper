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
		$scope.goals = Goals.list();
		$scope.onReorder = function (fromIndex, toIndex) {
			Goals.reorder(fromIndex, toIndex)
		};
	})
	.controller('GoalTasksCtrl', function ($scope, $stateParams, Goals, Tasks, $ionicPopover, $location, GoalEdit, TaskEdit, $filter) {
		$scope.goalEdit = GoalEdit;
		$scope.taskEdit = TaskEdit;
		$scope.goal = Goals.get($stateParams.goalId);
		$scope.tasks = Tasks.list()
		$filter('filter')($scope.tasks, {'goalId':  $scope.goal.id});
		$filter('orderBy')($scope.tasks, function(task) {
			return task.dueDate || 0;
		}, true);
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
				template: 'Do you give up with this goal?'
			}).then(function(res) {
				if(res) {
					Goals.remove($scope.goal);
					$location.path('/tab/goals')
				}
			});
		};
		$scope.onReorder = function (fromIndex, toIndex) {
			Tasks.reorder(fromIndex, toIndex)
		};
		$scope.increaseDone = function (task) {
			if (task.done >= task.repeat) return;
			var task = angular.copy(task);
			task.done = Math.min(task.done + 1, task.repeat);
			Tasks.update(task);
		};
	});
