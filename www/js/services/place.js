'use strict';

angular.module('rewardnersServices')
.factory('Place', function(ApiResource, $q, BaseModel) {
  var resource = "places";
  var resource_singular = "Place";

  var Place = BaseModel.extend({
    $constructor: function Place(properties) {
      this.$initialize.apply(this, arguments);
    },
    defaultOptions: function() {
      return {};
    },

    getBannerUrl: function getBannerUrl(){
      var bannerUrl = "/img/banner_default.png";
      if(!(this.banner_medium.indexOf("banner_default.png") > -1)){
        bannerUrl = this.banner_medium;
      }
      return bannerUrl;
    },

    getLogoUrl: function getLogoUrl(){
      var logoUrl = "/img/default-logo.png";
      if(!(this.logo_medium.indexOf("default-logo.png") > -1)){
        logoUrl = this.logo_medium;
      }
      return logoUrl;
    }

  });

  Place.metadata = function() {
      return {
        resource: resource,
        resource_singular: resource_singular
      };
  };

  Place.own = function() {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, method: "owned"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };

  Place.find = function(placeId) {
    var model = this;
    var modelInstance = new model();
    var _deferred = $q.defer();
    var deferred = ApiResource.index({resource: resource, id: placeId, method: "info"}, modelInstance.defaultOptions() );
    deferred.$promise.then(
      function(data){
        BaseModel.loadModel(model, data, _deferred);
      }, function(error){
        _deferred.reject({status: error.status, message: error.statusText})
      }
    );
    return _deferred.promise;
  };


  return Place;
});