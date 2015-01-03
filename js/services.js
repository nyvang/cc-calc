/**
 *  **** SERVICES.JS ****
 * All custom services live here
 *
 * Author       :   Nicolaj Nyvanng
 * Web          :   http://ccnn.dk
 * Contact      :   nicolajnyvang@gmail.com
 * Project URL  :   https://github.com/nyvang/cc-calc
 */
(function () {
	var app = angular.module('serviceModule', []);
	
	/* 
	 * Detect user language, and use appropriate localized resources
	 */
	app.factory('systemLanguage', function ($window) {

		var lng = $window.navigator.userLanguage || $window.navigator.language;
		return resources[lng];
	});

	/*
	 * WeekCalcService finds the number of weeks since CC v6.0 was released
	 */
	app.factory('weekCalcService', function () {

		// Hardcode the release day of Crime City version 6
		var rel_date = '2014/12/16';
		var weekInMillis = (3600 * 24 * 1000) * 7;
		
		// Add new functionality to the Date object
		Date.prototype.days = function (to) {
			return Math.abs(Math.floor(Date.parse(to) / (weekInMillis)) - Math.floor(this.getTime() / (weekInMillis)));
		};

		return new Date(rel_date).days(new Date());
	});

})();