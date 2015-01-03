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
	var logic = angular.module('calculation-logic', ['serviceModule']);

	/**
	 * Calculations controller
	 * Responsible for doing all calculations and proberbillity. 
	 * Notice: Several dependencies is injected (primarily services), 
	 * to handel the different jobs
	 */	
	logic.controller('calculations', function ($scope, $window, weekCalcService, systemLanguage) {
		$scope.stats 						= {};
											// TEST VALUES
		$scope.stats.myMafiaAtt				= 162000000;
		$scope.stats.myMafiaDef				= 92000000;
		$scope.stats.myMafiaAcc				= 123;
		$scope.stats.myKingpin				= 34;
		$scope.stats.targetDef				= 236000000;
											// Initial void values
		$scope.message						= "";
		$scope.estimatedTargetAttack		= null;
		$scope.estimatedTotalMafia			= null;
		$scope.estimateMyAccomplice			= null;
		$scope.estimateMyKingpinPower		= null;
		
	 	// Flags used for ng-show/hide
		$scope.showWarningTxt 				= true;
		$scope.showResults 					= false;
		
	 	/**
		 * Most players have 1.5 x higher attack than defence,
		 * hence, the multiplier is: 1.5
		 */
		$scope.estAtt = function (targetDef) {
    		return Math.floor(targetDef * 1.5);
		};
		
		$scope.estTotal = function (targetDef, targetAtt) {
		 	return targetDef + targetAtt;
		};
		
		// Call to the serviceModule -> weekCalcService
		$scope.weeks = weekCalcService;
		$scope.msg = systemLanguage;
		console.log($scope.msg);

		$scope.assessAcc = function (myAcc) {

			var weeksSince, good, medium, low;
			
			weeksSince = $scope.weeks;

		 	// Thresholds
			good = 100 * weeksSince;
			medium = 50 * weeksSince;
			low = 15 * weeksSince;

		 	// Actual logic
			if (myAcc < low) {
				return $scope.msg.acc.none;
			} else if (myAcc < medium) {
				return "Low Chance!";
			} else if (myAcc < good) {
				return "Medium Chance!";
			} else if (myAcc >= good) {
				$scope.showWarningTxt = false;
				return "You are epic!";
			}
		};
		
		$scope.assessKP = function (myKP) {

			var weeksSince, good, medium, low;
			
			weeksSince = $scope.weeks;

		 	// Thresholds
			good = 100 * weeksSince;
			medium = 50 * weeksSince;
			low = 15 * weeksSince;

			if ((myKP < low) && ($scope.estimateMyAccomplice === "You are epic!")) {
				return "Acc makes up for your KP";

			} else if (myKP < medium &&
						($scope.estimateMyAccomplice === "Medium Chance!"))  {
				return "Low -> medium chance. You should stick to Acc only.";

			} else if (myKP < good) {
				$window.console.log("High Kp, please consider moving some points to Acc if possible");
				return "Medium Chance!";

			} else if (myKP >= good) {
				$window.console.log("Very high Kp, Move points to Acc. Your chances are decided by your target.");
				$scope.showWarningTxt = false;
				return "You are KP epic!";
			}
		}
		
		
		$scope.createAWordOfAdvice = function (myAcc, myKp, weeksSince) {
			var highest = (myAcc > myKp) ? "Accomplish" : "Kingpin Power";
			var warningTxt = "";
			var accWarn = "";
		  	if (highest === "Kingpin Power") {
				warningTxt = "Your KP is higher than your Acc, which in most cases won´t help you at all";  
			}
			if (myAcc < (50 * weeksSince)) {
				accWarn = "Your Acc is only: " + myAcc + " and to have a medium chance, you should have at least: " + (50 * weeksSince) + "\n"
			}
			$scope.wordOfAdvice = "The Accomplish system has been live for " + weeksSince + " weeks now," + "\n" +
				"and your stats are rather low." + "\n" + accWarn +
				"To preform successfull robbing, attacking (Wars included), you really have to shape up. " + warningTxt;

		} // end wordOfAdvice
		
		$scope.doCalc = function () {
			$scope.showResults = true;
			$scope.estimatedTargetAttack = $scope.estAtt($scope.stats.targetDef);
			$scope.estimatedTotalMafia = $scope.estTotal($scope.stats.targetDef, $scope.estimatedTargetAttack)
			$scope.estimateMyAccomplice = $scope.assessAcc($scope.stats.myMafiaAcc);
			$scope.estimateMyKingpinPower = $scope.assessKP($scope.stats.myKingpin);
			
			if ($scope.showWarningTxt) 
				$scope.createAWordOfAdvice ($scope.stats.myMafiaAcc, $scope.stats.myKingpin, $scope.weeks) ;
		}
  });

})();	