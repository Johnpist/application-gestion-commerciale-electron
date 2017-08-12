
angular.module('gCom.controller').controller('ListQuotationController',function ($controller,$scope,$q,dateFilter,DBService,Flash) {
	
	
	
	var base = $controller('ListBaseController', {$scope: $scope,$q:$q,DBService:DBService,Flash:Flash});
	base.getModel = function(){

  	 	return 'Devis';
  }
	var ctrl = this;
	angular.extend(this,base);
 
	function getInitialPage2(){
			DBService.reset();
			DBService.getPager2("CommandeVente",parseInt($scope.pageSize),{reference : $scope.state.reference,facturee : $scope.state.isFacturee , livree : $scope.state.isLivree ,ClientId : $scope.client.id,startDate : $scope.state.startPeriod,endDate : $scope.state.endPeriod}).then(function(o){
				ctrl.pager = o;
				ctrl.pager.initialPage().then(function(r){
						$scope.items = [];
						for(var i = 0 ; i < r.length ; i++)
						{
							$scope.items.push(r[i]);
						}
						
						$scope.$apply();
				});
			})	
	}	
	ctrl.getYearFirstDay = function(){
		d = new Date(new Date().getFullYear(), 0, 1);
		return d;    
	}	
	ctrl.getYearLastDay = function()
	{
		d = new Date(new Date().getFullYear(), 11, 31);
		return d;
	} 
	ctrl.init = function(){
			base.init();
			$scope.client = {};
			$scope.state = {};
			$scope.state.reference = null;
			$scope.state.startPeriod = dateFilter(ctrl.getYearFirstDay());
    	$scope.state.endPeriod = dateFilter(ctrl.getYearLastDay());
			
			$scope.$watch("client.id",function(){
				console.log("client id changed");
				if($scope.client.id)
				{
					getInitialPage2();
				}
			});
			$scope.$watch("client.reference",function(){
				console.log("client ref changed : " +   $scope.client.reference);
				if($scope.client.reference === '' )
				{
					console.log("client ref empty");
					$scope.client = {};	
					getInitialPage2();
				}
			});
			$scope.$watch("state.reference",function(p){
				console.log("reference " + p);
				getInitialPage2();
			});			
	
			

			$scope.$watch('state.startPeriod',function(){
			console.log('start period changed ' + new Date($scope.state.startPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});
			$scope.$watch('state.endPeriod',function(){
				console.log('end period changed ' + new Date($scope.state.endPeriod));
				if($scope.state.startPeriod && $scope.state.startPeriod !== '')
				getInitialPage2();
			});			
	}

  	this.init();
    this.getDetailsState = function(){
      return 'smgmt.createDevis({id:selected.id})';
    }
	 

});
