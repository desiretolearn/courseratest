(function() {
	'use strict';
	var app = angular.module('myFirstApp',[]);
	app.controller('myFirstController', myFirstController);
	app.controller('nameCalculatorController', ["$scope",nameCalculatorController]);
	app.controller("dIController",dIController);
	app.controller("nGController",nGController);
	app.controller("cFController",cFController);
	app.controller("counterController",counterController);
	app.controller("repeatController",repeatController);
	app.controller("parentController1",parentController1);
	app.controller("childController1",childController1);
	app.controller("parentController2",parentController2);
	app.controller("childController2",childController2);
	app.controller("manageShoppingListController",manageShoppingListController);
	app.controller("showShoppingListController",showShoppingListController);
	app.controller("shoppingListController1",shoppingListController1);
	app.controller("shoppingListController2",shoppingListController2);
	//register custome filter to module
	app.filter("loves",lovesFilter);
	app.filter("truth",truthFilter);

	app.service("shoppingListService",shoppingListService);

	// app.factory("shoppingListFactory1",shoppingListFactory1);
		app.factory("shoppingListFactory2",shoppingListFactory2);


	myFirstController.$inject = ["$scope"];
	dIController.$inject = ["$scope","$filter"];
	cFController.$inject = ["$scope","lovesFilter","truthFilter"];
	nGController.$inject = ['$scope'];
	counterController.$inject = ['$scope'];
	repeatController.$inject = ['$scope'];
	parentController1.$inject = ['$scope'];
	childController1.$inject = ['$scope'];
	manageShoppingListController.$inject = ['shoppingListService'];
	showShoppingListController.$inject = ['shoppingListService'];
	// shoppingListController1.$inject = ['shoppingListFactory1'];
	// shoppingListController2.$inject = ['shoppingListFactory1'];
	shoppingListController1.$inject = ['shoppingListFactory2'];
	shoppingListController2.$inject = ['shoppingListFactory2'];


	function myFirstController($scope) {
		$scope.name = "Sushma";
		$scope.sayHello = function($key) {
			return "say Hello "+$key;
		}
		$scope.sayHai = function() {
			return "say Hai "+ this.name;
		}
	};

	function nameCalculatorController($scope) {
		$scope.sname = "";
		$scope.nameValue = 0;
		$scope.displayNameValue = function() {
				this.nameValue = calculateNameValue(this.sname);
		}
		function calculateNameValue($name) {
			var nValue = 0;
			for(var i=0;i<$name.length;i++) {
				nValue += $name.charCodeAt(i);
			}
			return nValue;
		}
	};
	
	function dIController($scope,$filter) {
		$scope.pname = "";
		$scope.upper = function() {
			var uppCase = $filter('uppercase');
			this.pname = uppCase(this.pname);
		}
	};

	function nGController($scope) {
		$scope.stateOfBeing = "hungry";
		$scope.feedMe = function() {
			$scope.stateOfBeing = "Fed";
		}
	}

	function cFController($scope,lovesFilter,truthFilter) {
		$scope.msg = "";
		$scope.lovesmsg = function() {
			return lovesFilter(this.msg);
		}
		$scope.truthmsg = function() {
			return truthFilter(this.msg,"sushma","vamsi");
		}
	};

	function counterController($scope) {
		$scope.counter = 0;
		$scope.incrementCounter = function() {
			this.counter += 1;
		}
		$scope.checkCounter = function() {
			console.log($scope.$$watchersCount);
		}
		$scope.$watch('counter',function(oldValue,newValue) {
			console.log("check counter old value",oldValue);
			console.log("check counter new value",newValue);
		});
	}

	function repeatController($scope) {
		$scope.slist1 = ["Sushma","Vamsi","Monish","Saanvi","Vedha"];
		$scope.slist2 = [{"name":"Sushma","age":"30"},
					  {"name":"Vamsi","age":"36"},
					  {"name":"Monish","age":"2"}];
		$scope.addPerson = function() {
			var newPerson = {
				"name" : $scope.newName,
				"age" : $scope.newAge
			};
			$scope.slist2.push(newPerson);
		}
	}

	function parentController1($scope) {
		$scope.value = "Parent Value";
		$scope.obj = {
			"objValue" : "Parent Object Value"
		}
		$scope.meth = function() {
			return "Parent Method";
		}
		$scope.pc = this;
		$scope.pc.value = 2;
	}

	function childController1($scope) {

	}

	function parentController2() {
		var pc2 = this;
		this.value = 5;
		this.othervalue = 6;
	}

	function childController2() {
		var cc2 = this;
		this.othervalue = 7;
	}

	function manageShoppingListController(shoppingListService) {
		var manage = this;
		manage.addItem = function() {
			shoppingListService.addItem(manage.itemName,manage.itemQuantity);
		}
	}

	function showShoppingListController(shoppingListService) {
			var show = this;
			show.items = shoppingListService.getItems();
			show.removeItem = function($itemIndex) {
				shoppingListService.removeItem($itemIndex);
			}

	}

	// function shoppingListController1(shoppingListFactory1) {
			function shoppingListController1(shoppingListFactory2) {

		var list1 = this;
		// var shoppingList = shoppingListFactory1(4);
				var shoppingList = shoppingListFactory2.getShoppingList(4);

		list1.addItem = function() {
			try {
				shoppingList.addItem(list1.itemName,list1.itemQuantity);
			}
			catch(error) {
				list1.errorMessage = error.message;
			}
		}
		list1.items = shoppingList.getItems();
			list1.removeItem = function($itemIndex) {
				shoppingList.removeItem($itemIndex);
			}
	}

	// function shoppingListController2(shoppingListFactory1) {
			function shoppingListController2(shoppingListFactory2) {

		var list2 = this;
		// var shoppingList = shoppingListFactory1();
				var shoppingList = shoppingListFactory2.getShoppingList();

		list2.addItem = function() {
				shoppingList.addItem(list2.itemName,list2.itemQuantity);
		}
		list2.items = shoppingList.getItems();
			list2.removeItem = function($itemIndex) {
				shoppingList.removeItem($itemIndex);
			}
	}



//define custom filter
	function lovesFilter() {
		return function(input) {
			input = input || "";
			input = input.replace("likes","loves");
			return input;
		}
	};

	function truthFilter() {
		return function(input,target,replace) {
			input = input || "";
			input = input.replace(target,replace);
			return input;
		}
	}

	function shoppingListFactory1() {
		var factory = function($maxItems) {
			return new shoppingListService1($maxItems);
		}
		return factory;
	}

	function shoppingListFactory2() {
		var factory = 
		{
			getShoppingList : function($maxItems) {
				return new shoppingListService1($maxItems);
			}
		}
		return factory;
	}

	function shoppingListService() {
		var service = this;
		var items = [];

		service.getItems = function() {
			return items;
		}

		service.addItem = function(itemName,itemQuantity) {
				var item = {
				"itemName" : itemName,
				"itemQuantity" : itemQuantity
				}
				items.push(item);
		}

		service.removeItem = function(itemIndex) {
			items.splice(itemIndex,1);
		}
	}

	function shoppingListService1(maxItems) {
		var service = this;
		var items = [];

		service.getItems = function() {
			return items;
		}

		service.addItem = function(itemName,itemQuantity) {
			if(maxItems === undefined || 
				maxItems !== undefined && maxItems > items.length) {
				var item = {
				"itemName" : itemName,
				"itemQuantity" : itemQuantity
				}
				items.push(item);
			}
			else {
				throw new Error("Max Items ("+maxItems+") reached");
			}
			
		}

		service.removeItem = function(itemIndex) {
			items.splice(itemIndex,1);
		}
	}

})();