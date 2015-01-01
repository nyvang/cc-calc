/**
 * Angular script for the CrimeCity Calculator. 
 * Version: 0.0.2
 * Author: Nicolaj Nyvang
 * Web: http://ccnn.dk/cc-calc
 */
(function () {
 
 	'use strict';
	var app = angular.module('cccalc', [ 'calculation-logic' ]);
	
	// Init directives for easy overview of the index.html
	/* Header */
	app.directive('headerSection', function() {
		return {
			restrict: 		'E',
			templateUrl: 	'templates/_header.html'
		};
	});
	/* Main content (calculator inputform && output result) */
	app.directive('contentSection', function() {
		return {
			restrict: 		'A',
			templateUrl: 	'templates/_content.html',
			controller: 	'calculations',
			controllerAs: 	'calc'
		};
	});
	/* Footer */
	app.directive('footerSection', function() {
		return {
			restrict: 		'E',
			templateUrl: 	'templates/_footer.html'
		};
	});
})();