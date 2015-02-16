angular.module('starter.services', [])
	.factory('Storage', function() {
		return {
			load: function(key) {
				return angular.fromJson(localStorage[key])
			},
			save: function(key, data) {
				localStorage[key] = angular.toJson(data);
			}
		};
	})
	.factory('CRUD', function(filterFilter) {
		var CRUD = function(name, storage, dateFields) {
				this.name = name;
				this.storage = storage;
				this.items = [];
				this.dateFields = dateFields || ['dueDate', 'createDate'];
			};

		CRUD.prototype = {
			list: function() {
				return this.items;
			},
			get: function(id) {
				return filterFilter(this.items, {id: parseInt(id)})[0];
			},
			create: function(item) {
				item.id = this.nextId++;
				item.createDate = new Date();
				this.items.push(item);
				this.save();

				return item;
			},
			update: function(item) {
				angular.copy(item, this.get(item.id));
				this.save();
			},
			remove: function(item) {
				var item = this.get(item.id),
					index = this.items.indexOf(item);
				if (index > -1) {
					this.items.splice(index, 1);
					this.save();
				}
			},
			reorder: function(fromIndex, toIndex) {
				var moved = this.items.splice(fromIndex, 1);
				this.items.splice(toIndex, 0, moved[0]);
				this.save();
			},
			save: function() {
				this.storage.save(this.name, this.items);
			},
			load: function() {
				this.items = this.storage.load(this.name) || this.items;
				this._dateFieldsToObj(this.items);
				this._updateNextId();
			},
			setData: function(data) {
				this.items = data;
				this._updateNextId();
			},
			_updateNextId: function() {
				var maxId = -1;
				angular.forEach(this.items, function(item) {
					if (item.id > maxId) {
						maxId = item.id;
					}
				});

				return (this.nextId = ++maxId);
			},
			_dateFieldsToObj: function(item) {
				angular.forEach(item, function(value, key) {
					if (this.dateFields.indexOf(key) >= 0 && value) {
						item[key] = new Date(value);
					}
					if (angular.isObject(value) || angular.isArray(value)) {
						this._dateFieldsToObj(value)
					}
				}.bind(this));
			}
		};
		return CRUD;
	})
	.factory('Goals', function (CRUD, Storage) {
		var goals = [{
				id: 0,
				name: 'Upper intermediate in english',
				motivation: 'get good job',
				dueDate: new Date('2015-12-01'),
				createDate: new Date('2015-01-01'),
				progress: 10
			}, {
				id: 1,
				name: 'Learn angular',
				motivation: 'earn more money',
				dueDate: new Date('2015-06-30'),
				createDate: new Date('2015-01-01'),
				progress: 45
			}, {
				id:2,
				name: 'Навчитись вистрибувати на паралельний тротуар',
				motivation: 'Щоб швидше рухатись по пробкам. І ще чомусьБ напевно бо це круто. А так в основному економія часу ',
				dueDate: '2016-01-07',
				createDate: '2015-01-01',
				progress: 75
			}];

		var crud = new CRUD('goals', Storage);
		crud.load();
		//crud.setData(goals);

		return crud;
	})
	.factory('Tasks', function (CRUD, Storage) {
		var tasks = [{
				id: 0,
				goalId: 0,
				name: 'Go to speaking club',
				dueDate: new Date('2015-02-07'),
				createDate: new Date('2015-01-01'),
				status: 'waiting'
			}, {
				id: 1,
				goalId: 0,
				name: 'Read book in english',
				dueDate: new Date('2015-02-05'),
				createDate: new Date('2015-01-01'),
				status: 'waiting'
			}, {
				id: 2,
				goalId: 1,
				name: 'Write application using angular',
				dueDate: new Date('2015-02-09'),
				createDate: new Date('2015-01-01'),
				status: 'waiting'
			}];

		var crud = new CRUD('tasks', Storage);
		crud.load();
		//crud.setData(tasks);

		return crud;
	});
