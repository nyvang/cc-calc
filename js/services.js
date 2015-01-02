(function () {
	var app = angular.module('serviceModule', []);
	
	app.factory('weekCalcService', function () {

		// Hardcode the release day of Crime City version 6
		var rel_date = '2014/12/16';
		var weekInMillis = (3600 * 24 * 1000) * 7;
		
		// Add new functionality to the Date object
		Date.prototype.days = function (to) {
			return Math.abs(Math.floor(Date.parse(to) / (weekInMillis)) - Math.floor(this.getTime() / (weekInMillis)));
		};

		var service = new Date(rel_date).days(new Date());

		return service;
	});
})();