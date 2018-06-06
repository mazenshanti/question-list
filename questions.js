var myApp = angular.module('questions', ['ui.router','questionsController']);
myApp.config(['$stateProvider',function($stateProvider) {
  // An array of state definitions
  var states = [
    { 
      name: 'questionsListView', 
      url: '/questionsListView', 
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService) {
          return questionsService.getAllQuestions();
        }
      }
    },
    { 
      name: 'reload', 
      url: '/reload', 
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService) {
          return questionsService.fetchAllQuestions();
        }
      }
    },
    { 
      name: 'questionEdit', 
      url: '/questionEdit/{questionId}', 
      component: 'questionEdit',
      resolve: {
        question: function(questionsService,$stateParams) {
          return questionsService.getAllQuestions().find(function(question) { 
            return question.id === $stateParams.questionId;
          });
        }
      }
    },
    { 
      name: 'questionDelete', 
      url: '/questionDelete/{questionId}',
      component: 'questionsListView',
      resolve: {
        questions: function(questionsService,$stateParams) {
          return questionsService.deleteQuestion($stateParams.questionId)
        }
      }
    },
    { 
      name: 'addQuestion', 
      url: '/addQuestion',
      component: 'addQuestion'
    },
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
}]);

// myApp.run(['$rootScope', '$state', function($rootScope, $state) {

//     $rootScope.$on('$stateChangeStart', function(evt, to, params) {
//       if (to.redirectTo) {
//         evt.preventDefault();
//         $state.go(to.redirectTo, params, {location: 'replace'})
//       }
//     });
// }]);