angular.module('starter.services', [])
	.factory('Goals', function (filterFilter) {
		var goals = [{
				id: 0,
				name: 'Upper intermediate in english',
				motivation: 'get good job',
				progress: 10
			}, {
				id: 1,
				name: 'Learn angular',
				motivation: 'earn more money',
				progress: 45
			}, {
				id:2,
				name: 'Навчитись вистрибувати на паралельний тротуар',
				motivation: 'Щоб швидше рухатись по пробкам',
				progress: 75
			}],
			nextId = 3;


		return {
			list: function() {
				return goals;
			},
			get: function(id) {
				return filterFilter(goals, {id: parseInt(id)})[0];
			},
			create: function(goal) {
				goal.id = nextId++;
				goals.push(goal);

				return goal;
			},
			update: function(goal) {
				angular.copy(goal, this.get(goal.id));
			},
			remove: function(goal) {
				var index = goals.indexOf(goal);
				if (index > -1) {
					goals.splice(index, 1);
				}
			},
			reorder: function(fromIndex, toIndex) {
				var moved = goals.splice(fromIndex, 1);
				goals.splice(toIndex, 0, moved[0]);
			}
		};
	})
	.factory('Tasks', function (filterFilter) {
		var tasks = [{
			id: 0,
			goalId: 0,
			name: 'Go to speaking club',
			dueDate: new Date('2015-02-07'),
			status: 'waiting'
		}, {
			id: 1,
			goalId: 0,
			name: 'Read book in english',
			dueDate: new Date('2015-02-05'),
			status: 'waiting'
		}, {
			id: 2,
			goalId: 1,
			name: 'Write application using angular',
			dueDate: new Date('2015-02-09'),
			status: 'waiting'
		}];

		return {
			list: function() {
				return tasks;
			}
		}
	});
