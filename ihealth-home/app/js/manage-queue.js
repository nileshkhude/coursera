app.controller("queueController",function($scope,$location){

	$scope.createQueue = function(){
          $location.url("/createqueue");
      };

    $scope.gotoManageQueue = function(){
          $location.url("/managequeue");
      };

 	$scope.generateQueue = function(){
          alert(angular.toJson($scope.queue));
      };

    $scope.viewQueueDetails = function(){
          $location.url("/queuedetails");
      };

    $scope.nextPatients = function(){
          //console.log("next");
          jQuery(".item").animate({ top: '-=111px' });//, 1000, "linear"
          //console.log("next again");
      };

    $scope.prevPatients = function(){
          //console.log("prev");
          jQuery(".item").animate({ top: '+=111px' });//, 1000, "linear"
          //console.log("prev again");
      };
});