'use strict';

/**
 * @ngdoc directive
 * @name locationApp.directive:placeAutocomplete
 * @description
 *
 * # An element directive that provides a dropdown of
 * location suggestions based on the search string.
 * When an item is selected, the location's latitude
 * and longitude are determined.
 * 
 * This directive depends on the Google Maps API
 * with the places library
 * 
 * <script src="https://maps.googleapis.com/maps/api/js?libraries=places"></script>
 * 
 * Usage:
 * <place-autocomplete ng-model="selectedLocation"></place-autocomplete>
 *
 * Credit:
 * http://stackoverflow.com/a/31510437/293847
 */
angular.module('ihealthMantra')
  .directive('placeAutocomplete', function() {
    return {
      templateUrl: '../template/place-autocomplete.html',
      restrict: 'E',
      replace: true,
      scope: {
        'ngModel': '='
      },
      controller: function($scope, $q, $rootScope) {
        if (!google || !google.maps) {
          throw new Error('Google Maps JS library is not loaded!');
        } else if (!google.maps.places) {
          throw new Error('Google Maps JS library does not have the Places module');
        }
        


        /*var myLatlng = new google.maps.LatLng(19.0760,72.8777);
        var mapOptions = {
          zoom: 8,
          center: myLatlng,
          componentRestrictions: {country: "IN"}
        };

        var map = new google.maps.Map(document.querySelector('#map'),mapOptions);*/

        var map = new google.maps.Map(document.querySelector('#map'));
        var input = document.getElementById('locality-search');  
        var autocompleteService = new google.maps.places.AutocompleteService();
       
        var placeService = new google.maps.places.PlacesService(map);

        var geocoder = new google.maps.Geocoder();

        
        $scope.ngModel = {};

        /**
         * @ngdoc function
         * @name getResults
         * @description
         *
         * Helper function that accepts an input string
         * and fetches the relevant location suggestions
         *
         * This wraps the Google Places Autocomplete Api
         * in a promise.
         *
         * Refer: https://developers.google.com/maps/documentation/javascript/places-autocomplete#place_autocomplete_service
         */
        var getResults = function(address) {
          //alert('1.Inside getResults');
          var deferred = $q.defer();
          autocompleteService.getPlacePredictions({
          input: address,
          componentRestrictions: {country: 'in'}
          }, function(data) {
            deferred.resolve(data);
          });
          return deferred.promise;
        };

        /**
         * @ngdoc function
         * @name getDetails
         * @description
         * Helper function that accepts a place and fetches
         * more information about the place. This is necessary
         * to determine the latitude and longitude of the place.
         *
         * This wraps the Google Places Details Api in a promise.
         *
         * Refer: https://developers.google.com/maps/documentation/javascript/places#place_details_requests
         */
        var getDetails = function(place) {
          //alert('2.Inside getDetails');
          var deferred = $q.defer();
          placeService.getDetails({
            'placeId': place.place_id
          }, function(details) {
            deferred.resolve(details);
          });
          return deferred.promise;
        };

        $scope.search = function(input) {
          if (!input) {
            return;
          }
          return getResults(input).then(function(places) {            
            return places;
          });
        };
        /**
         * @ngdoc function
         * @name getLatLng
         * @description
         * Updates the scope ngModel variable with details of the selected place.
         * The latitude, longitude and name of the place are made available.
         *
         * This function is called every time a location is selected from among
         * the suggestions.
         */
        $scope.getLatLng = function(place) {
          if (!place) {
            $scope.ngModel = {};
            return;
          }
          getDetails(place).then(function(details) {
            //alert("In last getDetails : "+place.description);           
            //console.dir(place);
            $scope.ngModel = {
              'name': place.description,
              'latitude': details.geometry.location.lat(),
              'longitude': details.geometry.location.lng(),
            };
            //alert(angular.toJson($scope.ngModel));
            $rootScope.location = $scope.ngModel.name;
            var myLatlng1 = new google.maps.LatLng(details.geometry.location.lat(),details.geometry.location.lng());

            //geocoder start -- getting the value of city name
            var city;            
            geocoder.geocode({'latLng': myLatlng1}, function(results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
              //console.log(results)
                if (results[1]) {
                 //formatted address
                 alert(results[0].formatted_address);
                //find country name
                     for (var i=0; i<results[0].address_components.length; i++) {
                    for (var b=0;b<results[0].address_components[i].types.length;b++) {

                    //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
                        if (results[0].address_components[i].types[b] == "locality") {
                            //this is the object you are looking for
                            city = results[0].address_components[i];
                            break;
                        }
                    }
                }
                //city data
                //alert(city.short_name + " " + city.long_name);
                $rootScope.selectedCityGlobal = city.long_name;

                $scope.selectedCityGlobal = $rootScope.selectedCityGlobal;
                //alert("scope value : "+$scope.selectedCityGlobal+" : "+city.short_name + " " + city.long_name);
                }
             else {
                  alert("No results found");
                }
              } else {
                alert("Geocoder failed due to: " + status);
              }
            });
            //Geocoder End
            
            

          });
        }
      }
    };
  });