/* Controllers */

mainCtrl = angular.module('controllers', ['ui.router']);

mainCtrl.config('mainCtrl', ['$stateProvider',function($stateProvider) {
  var states = [
    { 
      name: 'hello', 
      url: '/hello', 
      // Using component: instead of template:
      component: 'hello'  
    },
    
    { 
      name: 'questionslist', 
      url: '/questionslist', 
      component: 'questionslist'
    },
    
    { 
      name: 'people', 
      url: '/people', 
      component: 'people',
      // This state defines a 'people' resolve
      // It delegates to the PeopleService to HTTP fetch (async)
      // The people component receives this via its `bindings: `
      resolve: {
        people: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    
    { 
      name: 'person', 
      // This state takes a URL parameter called personId
      url: '/people/{personId}', 
      component: 'person',
      // This state defines a 'person' resolve
      // It delegates to the PeopleService, passing the personId parameter
      resolve: {
        person: function(PeopleService, $transition$) {
          return PeopleService.getPerson($transition$.params().personId);
        }
      }
    }
  ]
  
  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });
});