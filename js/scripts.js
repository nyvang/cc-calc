(function() {
	var app = angular.module('cccalc', [ ]);
	
	app.controller('calculations', function($scope, $window) {
	//app.controller('Ctrl', function($scope) {
		$scope.stats = {};
		$scope.stats.myMafiaAtt  = 162000000;
		$scope.stats.myMafiaDef = 92000000;
		$scope.stats.myMafiaAcc = 123;
		$scope.stats.myKingpin = 34;
		$scope.stats.targetDef = 236000000;
		
		$scope.message = "";
		$scope.estimatedTargetAttack;
		$scope.estimatedTotalMafia;
		$scope.estimateMyAccomplice;
		$scope.estimateMyKingpinPower;
		
		$scope.showWarningTxt = true;
		$scope.showResults = false;
		
		$scope.estAtt = function (targetDef) {
				return Math.floor(targetDef * 1.5);
		}
		
		$scope.estTotal = function (targetDef, targetAtt) {
				return targetDef + targetAtt;
		}
		
		$scope.getWeeks = function () {
			// Hardcode the release day of Crime City version 6
				var rel_date = '2014/12/16'; 
				var weekInMillis = (3600*24*1000)*7;
				Date.prototype.days = function (to) {
					return Math.abs( Math.floor( Date.parse(to) / (weekInMillis) ) -  Math.floor(  this.getTime() / (weekInMillis)) );
				}
				return new Date(rel_date).days( new Date() );	
		}
		
		$scope.assessAcc = function (myAcc) {
				
				var weeksSince = $scope.getWeeks();
				
				var good = 100 * weeksSince;
				var medium = 50 * weeksSince;
				var low = 15 * weeksSince;
			
				if (myAcc < low) {
					return "NO Chance!";
				} else if (myAcc < medium) {
					return "Low Chance!";
				} else if (myAcc < good) {
					return "Medium Chance!";
				} else if (myAcc >= good) {
					$scope.showWarningTxt = false;
					return "You are epic!";
				}
		}
		
		$scope.assessKP = function (myKP) {

				var weeksSince = $scope.getWeeks();
			
				var good = 100 * weeksSince;
				var medium = 50 * weeksSince;
				var low = 35 * weeksSince;
			
				if ( (myKP < low) && 
						 ($scope.estimateMyAccomplice === "You are epic!") ) {
					return "Acc makes up for your KP";
				
				} else if (myKP < medium &&  
						  ($scope.estimateMyAccomplice === "Medium Chance!"))  {
					return "Low -> medium chance. You should stick to Acc only.";
				
				} else if (myKP < good ) {
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
				$scope.createAWordOfAdvice ($scope.stats.myMafiaAcc, $scope.stats.myKingpin, $scope.getWeeks()) ;
		}
  });
})();
