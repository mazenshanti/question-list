angular.module('questions').service('questionsService', function($http) {
  var allQuestions = [];
  var service = {
    fetchAllQuestions: function() {
      return $http.get('data/questions.json', { cache: true }).then(function(response) {
        allQuestions = response.data
        return allQuestions;
      });
    },

    getAllQuestions: function(){
      return allQuestions;
    },

    putAllQuestions: function(questions){
      allQuestions = questions;
    },

    postQuestions: function(questions) {
      var theJSON = JSON.stringify(questions);
      return $http.post('data/questions.json',theJSON);
    },

    deleteQuestion: function(id) {
      function questionId(question) {
        return question.id === id;
      }
      var index = allQuestions.findIndex(questionId);
      allQuestions.splice(index,1);
      console.log(allQuestions);
      return allQuestions;
    },

    getQuestion: function(id) {
      function questionId(question) {
        return question.id === id;
      }
      return allQuestions.find(questionId);
    },

    addQuestion: function(input){
      allQuestions.push(input);
    }
  }
  
  return service;
})
