//var app = angular.module("ihealthMantra",['ngRoute','ngMaterial', 'ngMessages','material.svgAssetsCache','angularRangeSlider']);

var app = angular.module("ihealthMantra",['ngRoute','ngMaterial', 'ngMessages','material.svgAssetsCache','ngSanitize','jkAngularCarousel','jkAngularRatingStars']);

app.config(function($routeProvider){
  $routeProvider
  .when('/',{
      templateUrl:"./template/home.html"
  })
  .when('/search',{
    templateUrl:"./template/search-page.html"
  })
  .when('/search1',{
    templateUrl:"./template/search-page1.html"
  })
  .when('/search2',{
    templateUrl:"./template/search-page2.html"
  })
  .when('/search3',{
    templateUrl:"./template/search-page3.html"
  })
  .when("/managequeue",{
    templateUrl:"./template/manage-queue.html"
  })
  .when("/createqueue",{
    templateUrl:"./template/create-queue.html"
  })
  .when("/queuedetails",{
    templateUrl:"./template/queue-details.html"
  })
  .when("/corporate",{
    templateUrl:"./template/corporate.html"
  })
  .when("/school",{
    templateUrl:"./template/school.html"
  })
  .when("/seller",{
    templateUrl:"./template/seller.html"
  });


// Update the theme colors to use themes on font-icons
   /*$mdThemingProvider.theme('default')
          .primaryPalette("red")
          .accentPalette('green')
          .warnPalette('blue');*/

});

app.constant( 'font', {
  title:{ "font-family" : "proxima-nova,'Helvetica Neue',Helvetica,Arial,sans-serif"}, //"",
  url:'https://fonts.googleapis.com/css?family=Glegoo&amp;subset=devanagari,latin-ext'
 });


app.controller("fontCtrl",function($scope,font,$rootScope){
  $rootScope.font = font;
});

app.service('cityApiService', function($http){
		/*var BASE_URL = "https://uatbackend.ihealthmantra.com";
		var API_KEY = "q981AHBPMZ7TxJMyRyFiVkcLLvWOCAr73nINpoTd";*/

    const BASE_URL="https://api.ihealthmantra.com";
    const API_KEY="rXH2mG4zKS3fSN2CUspvc8r8Ox6lQ6wD3uGpPKpb"
    this.getcityList = function() {
			var url=BASE_URL+"/product/citylist";
      //alert("in");
			return $http({
				method : "GET",
				url : url,
				headers :{
					'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin' : '*',
					'x-api-key':API_KEY
					}
			});
    }
});


app.service('categoryListApiService', function($http){
    this.getCategoryList = function() {
      var url="https://backend.ihealthmantra.com/product/namelist";
      //alert("in");
      return $http({
        method : "GET",
        url : url,
        headers :{
          'Content-Type' : 'application/json',
          }
      });
    }
});

app.controller('headerCtrl', function ($scope,cityApiService,$window,$mdDialog,$http,$timeout,$interval, $rootScope) {	


  $rootScope.isOpen = false;

$scope.$watch('isOpen', function(isOpen) {
        if (isOpen) {
          $timeout(function() {
            $scope.tooltipVisible = $rootScope.isOpen;
          }, 600);
        } else {
          $scope.tooltipVisible = $rootScope.isOpen;
        }
      });

	var originatorEv;	
	$scope.imgMapUrl = 'https://s3-ap-southeast-1.amazonaws.com/ihmcustportalresources/ic_place_24px.svg';
	
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
   
    $scope.clientEmailShow = true;

    function showErrorsLogic() {
        var clientNameLen = jQuery("input[name='clientName']").val().length;
        var clientEmailLen = jQuery("input[name='clientEmail']").val().length;
        var clientPhoneLen = jQuery("input[name='phone']").val().length;
        var clientDesLen = jQuery("input[name='description']").val().length;
        $scope.clientNameShow = ( (clientNameLen < 1) ? false : true );
        $scope.clientEmailShow = ( (clientEmailLen < 1) ? false : true );
        $scope.clientPhoneShow = ( (clientPhoneLen < 1) ? false : true );
        $scope.clientDesShow = ( (clientDesLen < 1) ? false : true );
    }

    this.showPrerenderedDialog = function() {

      $scope.runUntil = $interval(showErrorsLogic , 2000);     

      $mdDialog.show({
        contentElement: '#contactUsDialog',
        parent: angular.element(document.body)/*,
        clickOutsideToClose:true*/
      });

    };

   $scope.project = {
        clientName: "",
        clientEmail: "",
        phone: "",
        description: ""
    }

    $scope.projectMaster = {
        clientName: "",
        clientEmail: "",
        phone: "",
        description: ""
    }

    $scope.closeDialog = function() {
        $mdDialog.hide();
        var myform = angular.element(document.getElementById("inquiryForm"));
        /*document.getElementById("inquiryForm").className = "ng-pristine";
        document.getElementById("inquiryForm").removeClass = "ng-invalid";*/

        $scope.project = angular.copy($scope.projectMaster);

        $scope.inquiryForm.$setPristine();
        $scope.inquiryForm.$setUntouched();
        
        //jQuery("div[ng-messages]").css("opacity","0");
        $interval.cancel($scope.runUntil);
        $timeout(showErrorsLogic , 2000);
    };

    /*$scope.showHints = true;*/

    $scope.mobileValidate = function(ev){
      var inputValue = document.getElementById("phoneInput").value;
      var key = event.keyCode || event.charCode;

      if(inputValue.length==1 && (key!=8 && key != 46) ){        
        $scope.project.phone = "+91 "+inputValue;
      }
    }

  $scope.isShow = true;
  $scope.submitContact = function(){
      $scope.isShow = false;
      $scope.reset = function() {
          $scope.project = angular.copy($scope.projectMaster);
          $scope.inquiryForm.$setPristine();
          $scope.inquiryForm.$setUntouched();
      };   

      $timeout(function() {
          alert(angular.toJson($scope.project));
          $scope.isShow = true;         
          showErrorsLogic();
          $mdDialog.hide();
          $interval.cancel($scope.runUntil);
          showSuccess();
          $scope.reset();
        }, 3000);     
  }

    function showSuccess() {
        $mdDialog.show(
          $mdDialog.alert()
            .targetEvent(originatorEv)
            .clickOutsideToClose(true)
            .parent('body')
            .title('')
            .textContent('Thank you for sending request, our customer support will reach you soon.')
            .ok('close')
        );

        originatorEv = null;
      }

    cityPromice($scope,cityApiService);

    // get global value
      $scope.getSerchResult = function(){
        alert($rootScope.selectedCityGlobal);
      }

});


function cityPromice($scope, apiService){

  var promise;
    $scope.showError=false;

    $scope.catPriorityDetails;
    $scope.catDealDetails;
    $scope.catArray=[];
    
    $scope.getCity = function (text) {
           text = text.charAt(0).toUpperCase();
           var ret = $scope.cityList.filter(function (d) {
               return d.startsWith(text);
           });
           return ret;
       }

    promise = apiService.getcityList();
     
    promise.then(function(response) {
          $scope.cityList=response.data;
          //alert(response.data.toString());          
        }, function(response) {
        //alert("error");
    });
}


app.controller("searchCtrl", function($timeout, $scope, cityApiService, $q, $location, categoryListApiService) {
  $scope.city = null;
  $scope.cities = null;
  var self = this;
  $scope.loadCities = function() {

    // Use timeout to simulate a 650ms request.
    return $timeout(function() {

      $scope.cities = ["Mumbai","Pune","Bangalore","more"];
    }, 650);
  };
  
  
      $scope.sizes = [
          "small (12-inch)",
          "medium (14-inch)",
          "large (16-inch)",
          "insane (42-inch)"
      ];


    var promise;

    $scope.catPriorityDetails;
    $scope.catDealDetails;
    $scope.catArray=[];
    
    $scope.getCategory = function (text) {
           text = text.charAt(0).toUpperCase();
           var ret = $scope.categoryList.filter(function (d) {
               return d.startsWith(text);
           });
           return ret;
       }


    promise = categoryListApiService.getCategoryList();
         
    promise.then(function(response) {
        $scope.categoryList=response.data;
        //alert(response.data.toString());          
        }, function(response) {
        //alert("error");
    });

    cityPromice($scope,cityApiService);

    //new search input logic
   /*$scope.initAutocomplete = function() {
    
    alert("initAutocomplete");
        // Create the autocomplete object, restricting the search to geographical
        // location types.
        autocomplete = new google.maps.places.Autocomplete(
            (document.getElementById('myserarch')),
            {types: ['geocode']});

        // When the user selects an address from the dropdown, populate the address
        // fields in the form.
    var geolocation = {
              lat: 19.0760,
              lng: 72.8777
            };

      
      console.log("Okhjjh : "+geolocation);
            var circle = new google.maps.Circle({
              center: geolocation,
              radius: 2000
            });
            autocomplete.setBounds(circle.getBounds());
        //autocomplete.addListener('place_changed', fillInAddress);
        $scope.autocomplete = autocomplete;
        console.dir($scope.autocomplete);

        return autocomplete;

      }

      var ss = google.maps.event.addDomListener(window, 'load', $scope.initAutocomplete);
      */

      $scope.searchFor = function(){
          $location.url("/search1");
      };  
});


app.controller("testimonialsCtrl",function($scope){

    $scope.playMe = function(myId, myicon){
      console.log("show");
      pauseAll();
      $scope.playIconShow = "false";
      var videoElement = angular.element( document.querySelector( myId) );
      videoElement.attr('controls','');
      var myVideo = document.querySelector( myId );
      document.querySelector( myicon ).style.display="none";
      if (myVideo.paused){
          myVideo.play();
        }
      else{
        myVideo.pause();
      }
    }
});

function pauseAll(){
  var videoElementIdArray = ["#bannerVideo","#testimonial1","#testimonial2"];
  angular.forEach(videoElementIdArray, function(id){
    var playedvideo = document.querySelector(id);
    console.dir(id);
    playedvideo.pause();
  });  
}

app.controller('sliderCtrl', function ($scope) {
    $scope.playMe = function(myId, myicon){
      console.log("show");
      pauseAll();
      $scope.playIconShow = "false";
      var videoElement = angular.element( document.querySelector( myId) );
      videoElement.attr('controls','');
      var myVideo = document.querySelector( myId );
      document.querySelector( myicon ).style.display="none";
      if (myVideo.paused){
          myVideo.play();
        }
      else{
        myVideo.pause();
      }
    }
});

app.filter('trustAsResourceUrl', ['$sce', function($sce) {
	return function(val) {
		return $sce.trustAsResourceUrl(val);
	};
}]); 