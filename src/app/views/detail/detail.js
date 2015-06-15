'use strict';

var angular = require('angular');
var template = require('./detail.html');
// services
var projectService = require('../../services/projectService');
// sub components
var headerComponent = require('../../components/header/header');
var avatarComponent = require('../../components/avatar/avatar');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.detail', [
	projectService.name,
	headerComponent.name,
	avatarComponent.name
])
.directive('myViewDetail', function (
	MyProjectService
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewDetailCtrl as Detail',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {
		}
	};
})
.controller('MyViewDetailCtrl', function (
	$scope,
	$routeParams,
	MyProjectService
) {
	var Detail = this;

	Detail.getDetails = function (id) {
		return MyProjectService.get(id)
			.then(function (details) {
				Detail.details = details;
				// console.log('retrieved', $scope.details);
			})
			.catch(function (err) {
				console.warn('getDetails error', id, err);
			});
	};

	Detail.updateDetails = function (id, details) {
		return MyProjectService.update(id, details)
			.then(function (details) {
				Detail.details = details;
				// console.log('updated', $scope.details);
			})
			.catch(function (err) {
				console.warn('updateDetails error', id, err);
			});
	};

	Detail.key = $routeParams.key;
	Detail.getDetails(Detail.key);
});