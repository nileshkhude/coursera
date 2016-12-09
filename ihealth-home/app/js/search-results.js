app.controller("searchResultController",function($scope, $mdDialog){

/*$scope.showRating = function() {
  var position = $mdPanel.newPanelPosition()
      .absolute()
      .center();
  var config = {
    attachTo: angular.element(document.body),
    controller: PanelDialogCtrl,
    controllerAs: 'ctrl',
    disableParentScroll: true,
    templateUrl: '../template/review.template.html',
    hasBackdrop: true,
    panelClass: 'demo-dialog-example',
    position: position,
    trapFocus: true,
    zIndex: 150,
    clickOutsideToClose: true,
    escapeToClose: true,
    focusOnOpen: true
  };
  $mdPanel.open(config);
};*/

    $scope.locations = ["Aundh","Hadapsar","Shivaji Nagar"];
    $scope.selectedLocations = [];

    $scope.recomendations = ["recomendation 1","recomendation 2","recomendation 3"];
    $scope.selectedRecomendations = [];

    $scope.toggle = function (item, list) {
      var idx = list.indexOf(item);
      if (idx > -1) {
        list.splice(idx, 1);
      }
      else {
        list.push(item);
      }
    };

    $scope.exists = function (item, list) {
      return list.indexOf(item) > -1;
    };

    $scope.showRating = function(ev){
      $mdDialog.show({
          controller: reviewController,
          templateUrl: '../template/review.template.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };


    $scope.showAddressMap = function(ev){
      $mdDialog.show({
          controller: reviewController,
          templateUrl: '../template/address.template.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: false // Only for -xs, -sm breakpoints.
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };



    $scope.dataArray = [
          {
            src: 'http://www.satradehub.org/images/Weekly_Bullets/Images/2015.7.24_FTFLabsTraining_SouthAfrica.gif'
          },
          {
            src: 'https://intermountainhealthcare.org/~/media/Images/Global/1-1/trans-lab-mtg.jpg?mw=476'
          },
          {
            src: 'http://www.satradehub.org/images/Weekly_Bullets/Images/2015.7.24_FTFLabsTraining_SouthAfrica.gif'
          },
          {
            src: 'https://thumbs.dreamstime.com/x/female-researcher-chemistry-lab-28577172.jpg'
          },
          {
            src: 'http://www.satradehub.org/images/Weekly_Bullets/Images/2015.7.24_FTFLabsTraining_SouthAfrica.gif'
          },
          {
            src: '../images/nophoto.png'
          }
        ];

    //compare change
    $scope.data = {};
    $scope.message = 'false';
    $scope.compareListItem = [];
    $scope.transformChipForCompare = transformChipForCompare;

    function transformChipForCompare(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    $scope.onChange = function(cbState, name, price) {
        $scope.message = cbState;        
        if ($scope.message) {
          if ($scope.compareListItem.length < 3) {
            var pushItem = {name:name,price: price};
            $scope.compareListItem.push(pushItem);
            console.log(angular.toJson($scope.compareListItem));
          }
          else{
            //$scope.comparelistMax = true;
            jQuery(".comparelistMax").fadeIn("fast");
            jQuery(".comparelistMax").fadeOut(3000);
          }
        }

        if ($scope.compareListItem) {
          jQuery("#comparelist").fadeIn(1000);
          console.log("hi");
        }

        if (!$scope.compareListItem) {
          jQuery("#comparelist").fadeOut(1000);
        }
    };

  	$scope.slider1 = {
  	    min: 0,
  	    max: 25000
  	};

  	$scope.slider2 = {
  	    min: 0,
  	    max: 25000
  	};

    $scope.distanceRange = {
        value:20
    };

    $scope.priceRange = {
        value:25000
    };

  	$scope.myDate = new Date();

  	$scope.minDate = $scope.myDate;

  	/*$scope.maxDate = new Date(
      $scope.myDate.getFullYear(),
      $scope.myDate.getMonth() + 2,
      $scope.myDate.getDate());*/

    $scope.isOpen = false;

    $scope.openCalender = function(){
    	$scope.isOpen = (($scope.isOpen == "false") ? "true":"false") ;
    	//alert($scope.isOpen);
    }

    $scope.selectedDate = function(){
      $scope.isOpen = false;
      alert($scope.myDate);
    }

    $scope.isShow = false;
    $scope.goto = function(val){

    	if(val=="details"){
    		//alert("details");
    		$scope.currentContent = "<p>details goes here<p>";
    	}
    	else if(val=="map"){
    		//alert("map");
    		$scope.currentContent = "Map goes here";
    	}
    	else if(val=="deals"){
    		//alert("deals");
    		$scope.currentContent = "deals goes here";
    	}
    	else if(val=="review"){
    		//alert("review");
    		$scope.currentContent = "review's goes here";
    	}else{
    		alert("blur");
    	} 
        //alert("inside goto");
          	
    }

    $scope.showContent = function($event){
        $scope.isShow = true;
        $event.stopPropagation();
    }


    $scope.hideContent = function(){

        $scope.isShow = false ;
        //alert("inside hideContent");
    }


    /* $scope.showMe=false;
    $scope.showFunction = function(){
        $scope.showMe=true;
    } */

    /*$scope.items = [{
      name  : 'First Item',
      value : 0
    },
    {
      name  : 'Second Item',
      value : 25000
    },
    {
      name  : 'Third Item',
      value : 700
    }];*/

    

    $scope.cutomeStyle = function(){
        $scope.myStyle = {'height':'45px'}
    }

    //Show and hide logic of filter section

    $scope.togleShowFilterCriteria = function(){
        if(window.innerWidth <= 768){
            var prop = jQuery(".filter-criteria").css("display");
            var propNew = prop=="none"?"block":"none";
            jQuery(".filter-criteria").css("display",propNew);
        }
    }

    // $scope.readonly = false;
    $scope.selectedTest = null;
    $scope.testSearchText = null;
    $scope.querySearch = querySearch;
    $scope.testData = loadTestData();
    $scope.selectedTests = [{name : "default test",type: "gfgf"}];
    $scope.autocompleteDemoRequireMatch = true;
    $scope.transformChip = transformChip;

    
    /**
     * Return the proper object when the append is called.
     */
    function transformChip(chip) {
      // If it is an object, it's already a known chip
      if (angular.isObject(chip)) {
        return chip;
      }

      // Otherwise, create a new one
      return { name: chip, type: 'new' }
    }

    /**
     * Search for testData.
     */

    function querySearch (query) {
      var results = query ? $scope.testData.filter(createFilterFor(query)) : [];
      return results;
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(test) {
        return (test._lowername.indexOf(lowercaseQuery) === 0) ||
            (test._lowertype.indexOf(lowercaseQuery) === 0);
      };

    }

    function loadTestData() {
      var testsJsonData = [
        {
          'name': 'Test 1',
          'type': 'Urea  (Urine 24H)'
        },
        {
          'name': 'Test 2',
          'type': 'Uric Acid'
        },
        {
          'name': 'Test 3',
          'type': 'Umbelliferous'
        },
        {
          'name': 'Test 4',
          'type': 'Composite'
        },
        {
          'name': 'Test 5',
          'type': 'Goosefoot'
        },
        {
          'name': 'Test 6',
          'type': 'Biuuuy'
        },
        {
          'name': 'Test 6',
          'type': 'Hffg'
        }
      ];

      return testsJsonData.map(function (testSel) {
        testSel._lowername = testSel.name.toLowerCase();
        testSel._lowertype = testSel.type.toLowerCase();
        return testSel;
      });
    }

});


/*app.controller("PanelDialogCtrl",PanelDialogCtrl);

function PanelDialogCtrl(mdPanelRef) {
  this._mdPanelRef = mdPanelRef;
}*/


app.controller("reviewController",reviewController);

function reviewController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }