/**
 *  **** LOGIC.JS ****
 * All calculation logic is handled from this module.
 * Notice the dependency module: 'serviceModule' which is found in the "services.js"
 * A lot of lines have been assembled here, and this file will be the victim of some major refactoring.
 *
 * Author       :   Nicolaj Nyvanng
 * Web          :   http://ccnn.dk
 * Contact      :   nicolajnyvang@gmail.com
 * Project URL  :   https://github.com/nyvang/cc-calc
 */

(function () {
	'use strict';

	var logic = angular.module('calculation-logic', ['serviceModule']);

	/**
	 * Calculations controller
	 * Responsible for doing all calculations and proberbillity. 
	 * Notice: Several dependencies is injected (primarily services), 
	 * to handel the different jobs
	 */	
	logic.controller('calculations', function ($scope, $window, initConstants, weekCalcService, systemLanguage) {
		
		/********* Init re-usable variables *********/

		var	good, medium, low;

		/********* Envoking injections *********/

		var weeks 						= weekCalcService,
		 	lngObject 					= systemLanguage,
			CONSTANTS 					= initConstants;

		/********* ng-models && bindings *********/

		// Player stats ( initiated with testvalues during devphase )
		$scope.stats 					= {};
		$scope.stats.myMafiaAtt			= 1823654789;
		$scope.stats.myMafiaDef			= 122453222;
		$scope.stats.myMafiaAcc			= 143;
		$scope.stats.myKingpin			= 53;
		$scope.stats.targetDef			= 153365000;
				
		// Initial void values
		$scope.estimatedTargetAttack	= null;
		$scope.estimatedTotalMafia		= null;
		$scope.estimateMyAccomplice		= null;
		$scope.estimateMyKingpinPower	= null;
		$scope.message					= "";

		// Flags used for ng-show/hide
		$scope.showWarningTxt 			= true;
		$scope.showResults 				= false;


		/********* Functionality *********/

	 	/**
		 * Most players have 1.5 x higher attack than defence,
		 * hence, the multiplier default is: 1.5
		 */
		$scope.estAtt = function (targetDef) {
    		return Math.floor(CONSTANTS.ATT_TO_DEF_MULTIPLIER * targetDef);
		};
		
		// Estimate targets total mafia
		$scope.estTotal = function (targetDef, targetAtt) {
		 	return targetDef + targetAtt;
		};

		// Calculate chances based on Accomplish size and weeks since release
		$scope.assessAcc = function (myAcc) {
	
		 	// Thresholds
		 	// chances = pointsPerWeek x weeksSinceRelease
			good = CONSTANTS.CHANCEMULTIPLIER.ACC_HIGH * weeks;
			medium = CONSTANTS.CHANCEMULTIPLIER.ACC_MEDIUM * weeks;
			low = CONSTANTS.CHANCEMULTIPLIER.ACC_LOW  * weeks;

		 	// Actual logic
		 	// Todo: Fix bad design (else if, else if, else if etc..)
			if (myAcc < low) {
				return lngObject.acc.none;
			} else if (myAcc < medium) {
				return lngObject.acc.low;
			} else if (myAcc < good) {
				return lngObject.acc.medium;
			} else if (myAcc >= good) {
				$scope.showWarningTxt = false;
				return lngObject.acc.good;
			}
		};
		
		// Calculate chances based on Kingpin Power size and weeks since release
		$scope.assessKP = function (myKP) {

			good = CONSTANTS.CHANCEMULTIPLIER.KP_HIGH * weeks;
			medium = CONSTANTS.CHANCEMULTIPLIER.KP_MEDIUM * weeks;
			low = CONSTANTS.CHANCEMULTIPLIER.KP_LOW * weeks;

			if ((myKP < low) && ($scope.estimateMyAccomplice === lngObject.acc.good)) {
				return lngObject.kp.none;

			} else if (myKP < medium && ($scope.estimateMyAccomplice === lngObject.acc.good))  {
				return lngObject.kp.low;

			} else if (myKP < good) {
				console.log(lngObject.kp.highkp);
				return lngObject.kp.medium;

			} else if (myKP >= good) {
				console.log(lngObject.kp.veryhighkp);
				$scope.showWarningTxt = false;
				return lngObject.kp.good;
			}
		};
		
		/*
		 * Creates a dynamic advice
		 * Based on playerstats, time and a fixed threashold
		 */
		$scope.createAWordOfAdvice = function (myAcc, myKp, weeksSince) {
			var highest = (myAcc > myKp) ? lngObject.acc.name : lngObject.kp.name;
			var warningTxt = "",
				accWarn = "";

		  	if (highest === lngObject.kp.name) {
				warninglngObject = lngObject.wow.kpwarning;  
			}
			if (myAcc < (CONSTANTS.ACC_WARNING_THRESHOLD * weeks)) {
				accWarn = lngObject.wow.accwarn_1 + myAcc + lngObject.wow.accwarn_2 + (CONSTANTS.ACC_WARNING_THRESHOLD * weeks) + "\n"
			}
			$scope.wordOfAdvice = lngObject.wow.wow1 + weeksSince + lngObject.wow.wow2 + "\n" +
				lngObject.wow.wow3 + "\n" + accWarn +
				lngObject.wow.wow4 + warningTxt;
		};
				
		/**
		 * Calc init
		 * The onClickListener which sets it all in motion, and updates the GUI with the different results
		 */
		$scope.doCalc = function () {
			$scope.showResults = true;
			$scope.estimatedTargetAttack = $scope.estAtt($scope.stats.targetDef);
			$scope.estimatedTotalMafia = $scope.estTotal($scope.stats.targetDef, $scope.estimatedTargetAttack)
			$scope.estimateMyAccomplice = $scope.assessAcc($scope.stats.myMafiaAcc);
			$scope.estimateMyKingpinPower = $scope.assessKP($scope.stats.myKingpin);
			
			if ($scope.showWarningTxt) 
				$scope.createAWordOfAdvice ($scope.stats.myMafiaAcc, $scope.stats.myKingpin, weeks);
		}
  	});
})();