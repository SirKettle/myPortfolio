'use strict';

var angular = require('angular');
var template = require('./detail.html');
// services
var projectService = require('../../services/projectService');
// sub components
var navigationComponent = require('../../components/navigation/navigation');
var avatarComponent = require('../../components/avatar/avatar');



// directive name:
//		namespaceTypeName (examples: wtComponentAvatar or dinoViewDetail )
// 
// template use:
// <namespace:type-name></namespace:type-name> (examples: <wt:component-avatar></wt:component-avatar> or <dino:view-detail></dino:view-detail> )

module.exports = angular.module('myApp.views.detail', [
	projectService.name,
	navigationComponent.name,
	avatarComponent.name
])
.directive('myViewDetail', function (
	MyProjectService
) {
	return {
		restrict: 'E',
		template: template,
		controller: 'MyViewDetailCtrl',
		replace: true,
		scope: {
			key: '='
		},
		link: function (scope, elem, attrs, controller) {

			console.log(scope.key);

			controller.getDetails(scope.key);
		}
	};
})
.controller('MyViewDetailCtrl', function (
	$scope,
	MyProjectService
) {

	this.getDetails = function (id) {
		return MyProjectService.get(id)
			.then(function (details) {
				$scope.details = details;
				// console.log('retrieved', $scope.details);
			})
			.catch(function (err) {
				console.warn('getDetails error', id, err);
			});
	};

	this.updateDetails = function (id, details) {
		return MyProjectService.update(id, details)
			.then(function (details) {
				$scope.details = details;
				// console.log('updated', $scope.details);
			})
			.catch(function (err) {
				console.warn('updateDetails error', id, err);
			});
	};
});