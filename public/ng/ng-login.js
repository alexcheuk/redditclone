var app = angular.module('login', []);

app.directive('uniqueEmail', function($http){
	var timer;
	var re = /\S+@\S+\.\S+/;
	return{
		require: 'ngModel',
	    link: function(scope, elem, attr, ctrl) { 
			//when the scope changes, check the email.
			ctrl.$parsers.unshift(function(value) {
				if(timer) clearTimeout(timer);

				if(value){
					timer = setTimeout(function(){
						if(re.test(value)){
							ctrl.$setValidity('validEmail', true);

							$http.post('/register/check_valid_email', {email:value}).success(function(res){
								ctrl.$setValidity('uniqueEmail', res.data.valid);
							});
						}else{
							ctrl.$setValidity('validEmail', false);
						}
						
						scope.$apply();
					}, 500);
				}else{
					ctrl.$setValidity('validEmail', null);
					ctrl.$setValidity('uniqueEmail', null);
				}
				
			});
		}
	}
});

app.run(function($rootScope){
	$rootScope.flip = false;
	$rootScope.flipForm = function(){
		$rootScope.flip = !$rootScope.flip;
	}
});

app.controller('LoginForm', function LoginFormCtrl($scope, $location) {
	
});

app.controller('RegistrationFormCtrl', function ($scope, $location, $http, $rootScope) {
	var defaultForm = {
		email: "",
		password:"",
		full_name: ""
	}

	$scope.submit = function(){
		if(!$scope.RegistrationForm.$invalid){
			$http.post('/register', {
				email: RegistrationForm.email.value,
				password: RegistrationForm.password.value,
				full_name: RegistrationForm.full_name.value
			}).success(function(res){
				$scope.RegistrationForm.$setPristine();
				$scope.signup = defaultForm;
				$rootScope.flip = true;
			});
		}
	}
});