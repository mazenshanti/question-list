var myApp = angular.module('questions', ['ui.router','questionsController']);

myApp.config(function($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $urlMatcherFactoryProvider.caseInsensitive(true);  
    var states = [
    { 
      name: 'questionsListView', 
      url: '/questionsListView', 
      component: 'questionsListView',
    },
    { 
      name: 'reload', 
      url: '/reload', 
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
      name: 'questionAdd', 
      url: '/questionAdd',
      component: 'questionAdd',
    },
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });

  $locationProvider.html5Mode(true);

});

// myApp.run(['$rootScope', '$state', function($rootScope, $state) {

//     $rootScope.$on('$stateChangeStart', function(evt, to, params) {
//       if (to.redirectTo) {
//         evt.preventDefault();
//         $state.go(to.redirectTo, params, {location: 'replace'})
//       }
//     });
// }]);