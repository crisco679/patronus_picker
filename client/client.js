var app = angular.module("patronusApp", []);

app.controller("magicController", ['$scope', '$http', function($scope, $http){
  $scope.first_name = '';
  $scope.last_name = '';
  $scope.names = [];
  $scope.patronus_name = '';
  $scope.patronus_names = [];

  var fetchPatronus = function(){
    console.log('fetchPatronus is getting called');
    $http.get('/patronus').then(function(response){
      console.log('this is sparta', response);
      if(response.status !==200){
        console.log('shits all broke');
      }
      $scope.patronus_name = '';
      $scope.patronus_names = response.data;
      return response.data;
    })
  }

  var fetchNames = function(){
    console.log('fetchName is getting called');
    $http.get('/people').then(function(response){
      console.log('this is the response from /people',response);
      if(response.status !==200){
        console.log('Failed to fetch names from API!');
      }
      $scope.first_name = '';
      $scope.last_name = '';
      $scope.names = response.data;
      return response.data;
    })
  }

  $scope.submitName = function(){
    console.log('names submitted');
    $http.post('/people',
    {first_name: $scope.first_name, last_name: $scope.last_name}
  ).then(fetchNames());
}
fetchNames();

$scope.submitPatronus = function(){
  console.log('patronus submitted');
  $http.post('/patronus',
  {patronus_name: $scope.patronus_name}
).then(fetchPatronus());
}
fetchPatronus();


}]);
