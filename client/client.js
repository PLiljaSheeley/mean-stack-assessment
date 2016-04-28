var app = angular.module("app", []);

app.controller("MainController", ["$scope", "$http", function($scope, $http) {
	$scope.heroArray = [];
	$scope.heroObject = {};

	$scope.getHeroes = function() {
    	$http.get("/heroes").then(function(response) {
      		$scope.heroObject = {};
      		$scope.heroArray = response.data;
    	});
  	};

  	$scope.getHeroes();

  	$scope.add = function(hero){
    	$http.post('/add', hero).then($scope.getHeroes());
  	}

  	$scope.deleteHero = function(hero) {
    	$http.delete("/deleteHero/" + hero._id).then(function(response) {
      	$scope.getHeroes()
      	console.log("Deleted");
    	});
    }; 
}]);