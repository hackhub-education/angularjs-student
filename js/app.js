var myapp = angular.module('student', [])
var host = 'http://student.webdxd.com/api/'

myapp.controller('studentController', function($http, $scope){

	$scope.students = []

	$http.get(host + 'student').success(function(response){
		$scope.students = response
	})

	$scope.getStudentDetail = function(sid) {

		$http.get(host + 'student/' + sid).success(function(response) {
			$scope.clickedStudent = response
		})

	}

	$scope.createNewStudent = function() {

		$http.post(host + 'student', $scope.newStudent).success(function(response) {
			if (response.isNew) {
				$scope.students.push(response.data)
				
			} else {
				for (var i = 0; i < $scope.students.length; i++) {
					if ($scope.students[i]._id === response.data._id) {
						$scope.students[i] = response.data
						$scope.clickedStudent = response.data
					}
				}
			}

			$scope.newStudent = undefined
			
		})

	}


	$scope.showEditForm = function() {
		$scope.newStudent = $scope.clickedStudent
		$scope.clickedStudent = undefined
	}

	$scope.deleteStudent = function(sid) {
		$http.delete(host + 'student/' + sid).success(function(response) {
			for (var i = 0; i < $scope.students.length; i++) {
					if ($scope.students[i]._id === response._id) {
						$scope.students.splice(i, 1)
						$scope.clickedStudent = undefined
					}
				}
		})
	}

	

})