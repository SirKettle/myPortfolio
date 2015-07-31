'use strict';

var angular = require('angular');

var twitterService = require('./twitterService.js');
var tumblrService = require('./tumblrService.js');

module.exports = angular.module('myApp.services.blogService', [
	twitterService.name,
	tumblrService.name
]).service('BlogService', function (
	$q,
	$http,
	$filter,

	TwitterService,
	TumblrService
) {

	return {
		getPosts: function () {
			var deferred = $q.defer();
			var posts = [];
			var tweetsPromise = TwitterService.getTweets().then(function (tweets) {
				posts = posts.concat(tweets);
			});

			var tumblrPromise = TumblrService.getPosts().then(function (tumblrPosts) {
				posts = posts.concat(tumblrPosts);
			});

			$q.allSettled([tweetsPromise, tumblrPromise]).finally(function () {
				// sort the posts
				posts = posts.sort(function (a, b) {
					return b.timeStamp - a.timeStamp;
				});

				deferred.resolve(posts);
			});

			return deferred.promise;
		}
	};
});
