angular.module('questions').component('questionEdit', {
	bindings: { question: '<' },
	templateUrl:  'view/questionEdit.html',
	controller: 'questionEdit',
	controllerAs: 'QEdit'
})

