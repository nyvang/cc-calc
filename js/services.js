/**
 *  **** SERVICES.JS ****
 * All custom services live here.
 * 
 * Included is:
 *	- systemLanguage
 *	- weekCalcService
 *	- initScopeVars
 *
 * Author       :   Nicolaj Nyvanng
 * Web          :   http://ccnn.dk
 * Contact      :   nicolajnyvang@gmail.com
 * Project URL  :   https://github.com/nyvang/cc-calc
 */
 
(function () {
	'use strict';

	var app = angular.module('serviceModule', []);

	/*
	 * Initiates variables and constants, which is used in calculations and to update the view
	 * The variables was refactored into a service and an Object for several reasons
	 * 1: To make the calculation controller more readable (fewer lines etc.)
	 * 2: It takes a whole lot of memory to create so many variables, even if I put them in a chain.
	 */
	app.factory('initConstants', function () {

		var CONSTANTS = function () {
			
			this.ACC_WARNING_THRESHOLD			= 50;
			this.ATT_TO_DEF_MULTIPLIER			= 1.5;

			this.CHANCEMULTIPLIER 				= {};
			this.CHANCEMULTIPLIER.ACC_LOW		= 35;
			this.CHANCEMULTIPLIER.ACC_MEDIUM	= 75;
			this.CHANCEMULTIPLIER.ACC_HIGH		= 125;

			this.CHANCEMULTIPLIER.KP_LOW		= 20;
			this.CHANCEMULTIPLIER.KP_MEDIUM		= 50;
			this.CHANCEMULTIPLIER.KP_HIGH		= 95;
		}	
		return new CONSTANTS();
	});
	
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

		// Define constants: release day of Crime City version 6 & a week in miliseconds
		var RELEASE_DATE = '2014/12/16',
			WEEK_IN_MILLIS = (3600 * 24 * 1000) * 7;
		
		// Add new functionality to the Date object
		Date.prototype.days = function (to) {
			return Math.abs(Math.floor(Date.parse(to) / (WEEK_IN_MILLIS)) - Math.floor(this.getTime() / (WEEK_IN_MILLIS)));
		};

		return new Date(RELEASE_DATE).days(new Date());
	});

})();