/**
 *  **** SCRIPTS.JS ****
 * Angular script for the CrimeCity Calculator. 
 * The main module along with templating is handled from within this file,
 * which also inits the other js files (Controllers & services) 
 *
 * Author       :   Nicolaj Nyvanng
 * Web          :   http://ccnn.dk
 * Contact      :   nicolajnyvang@gmail.com
 * Project URL  :   https://github.com/nyvang/cc-calc
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