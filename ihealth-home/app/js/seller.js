app.controller("sellerCtrl",function($scope, $log){
	//alert("hi");
	var tabs = [
          { title: 'Overview', content: "./template/seller/overview.html"},
          { title: 'Photos', content: "./template/seller/photos.html"},
          { title: 'Feedback', content: "./template/seller/feedback.html"},
          { title: 'Services', content: "./template/seller/services.html"},
          { title: 'Map', content: "./template/seller/map.html"}
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 0;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if ( current + 1 ) $log.debug('Hello ' + selected.title + '!');
    });

    /*$scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };*/

    $scope.callNow = function(){
    	$( ".callNow-section" ).slideToggle( "slow" );
    }

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
});


function init_map(){
    var myOptions = { zoom:14, 
            center:new google.maps.LatLng(18.578941603705193,73.815869),
            mapTypeId: google.maps.MapTypeId.ROADMAP
            };
    map = new google.maps.Map(document.getElementById('lab-map'), myOptions);
    marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(18.578941603705193,73.815869)});
    infowindow = new google.maps.InfoWindow({content:'<strong> Anusha Clinical Laboratory</strong><br>sai chouk, new sangvi<br>411027 Pune<br>'});
    google.maps.event.addListener(marker, 'click', function(){
      infowindow.open(map,marker);
    });
    infowindow.open(map,marker);
  }

google.maps.event.addDomListener(window, 'load', init_map);