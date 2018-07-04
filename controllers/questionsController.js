"use strict";

let questionsController = angular.module('questionsController', ['ngAnimate', 'ngSanitize', 'mgcrea.ngStrap']);


questionsController.controller('questionAdd', ['questionsService', function (questionsService) {
    let QAdd = this;
    let counter = 0;
    let counterRemove = 0;
    let temp = {
        "id": "",
        "questionText": "",
        "questionType": "",
        "answerType": ""
    };
    temp.id = counter;
    counter++;
    counterRemove++;
    QAdd.questions = [];
    QAdd.questions.push(temp);

    QAdd.addAnswer = function (index) {
        if (!QAdd.questions[index].answers) {
            QAdd.questions[index].answers = [];
        }
        let temp = {text: "", id: ""};
        temp.id = counter;
        counter++;
        QAdd.questions[index].answers.push(temp);
    };

    QAdd.Delete = function (index) {
        if (QEdit.question.answers && index) {
            let answers = QEdit.question.answers;
            answers.splice(index, 1);
        }
    };

    QAdd.addQuestion = function () {
        let temp = {
            "id": "",
            "questionText": "",
            "questionType": "",
            "answerType": ""
        };
        temp.id = counter;
        counter++;
        QAdd.questions.push(temp);
    };

    QAdd.remove = function (index) {
        if (QAdd.questions && index) {
            if (counterRemove > 1) {
                counterRemove--;
            } else {
                QAdd.questions[index] = undefined;
            }
            let questions = QAdd.questions;
            questions.splice(index, 1);
        }
        QAdd.hide = true;
    };

    QAdd.hideButton = function () {
        QAdd.hide = true;
    };

    QAdd.showButton = function () {
        QAdd.hide = false;
    };


    QAdd.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
    QAdd.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

    QAdd.submit = function () {
        if (QAdd.questions !== null) {
            let questions = questionsService.getAllQuestions();
            QAdd.questions.forEach(function (temp) {
                if (temp.questionText !== "" || temp.questionType !== "" || temp.answerType !== ""){
                    temp.id = "" + Math.floor(Math.random() * 1000);
                    questions.push(temp);
                }
            });
            questionsService.putAllQuestions(questions);
        }
    };
}]);

questionsController.controller('questionDelete', function (questionsService, $stateParams) {
    questionsService.deleteQuestion($stateParams.questionId);
});

questionsController.controller('questionEdit', ['questionsService', '$stateParams', '$scope', function (questionsService, $stateParams, $scope) {
    let QEdit = this;
    let counter = 0;
    QEdit.show = false;

    QEdit.hideButton = function(){
        QEdit.show = false;
    };

    QEdit.showButton = function(){
        QEdit.show = true;
    };

    // if(QEdit.question.answerType === "Multiple Choice - Single Choice") {
    //     if(QEdit.question.answers.length < 1) {
    //         QEdit.question.answers = [];
    //         let temp = {
    //             "text": "",
    //             "id": ""
    //         };
    //         QEdit.question.answers.push(temp);
    //     }
    // }

    function addID() {
        QEdit.question.answers.forEach(function (answer) {
            answer.id = counter;
            counter++;
        });
    }

    function sortable() {
        $('#sortable').sortable({
            axis: 'y',
            tolerance: 'pointer',
            items: '.item',
            handle: '#handle',
            // containment: 'parent',
            update: function () {
                $scope.sortedAnswers = $(this).sortable('toArray');
            },
            create: function () {
                $scope.sortedAnswers = $(this).sortable('toArray');
            }
        });
    }

    if (QEdit.question.answers) {
        addID();
        sortable();
    }

    QEdit.questionTypeOptions = ["Behavioral", "Opnion", "Welcome & Introduction"];
    QEdit.answerTypeOptions = ["Multiple Choice - Single Choice", "Free Text"];

    function questionId(question) {
        return question.id === $stateParams.questionId;
    }


    QEdit.submit = function () {
        if (QEdit.question.answerType === "Multiple Choice - Single Choice") {
            if ($scope.sortedAnswers.length > 0) {
                $scope.sortedAnswers.forEach(function (value, i) {
                    $scope.sortedAnswers[i] = angular.fromJson(value);
                    if ($scope.sortedAnswers[i].text === "") {
                        $scope.sortedAnswers.splice(i, 1);
                    }
                });
                QEdit.question.answers = $scope.sortedAnswers;
            } else {
                QEdit.question.answers.forEach(function (answer, i) {
                    if (answer.text === "") {
                        QEdit.question.answers.splice(i, 1);
                    }
                });
            }
        }else {
            QEdit.question.answers = [];
        }
        if (QEdit.question.answers.length < 1 && QEdit.question.answerType === "Multiple Choice - Single Choice"){
            QEdit.showButton();
            QEdit.question.answerType = "";
        }else{
            console.log("false");
            let questions = questionsService.getAllQuestions();
            let index = questions.findIndex(questionId);
            questions[index] = QEdit.question;
            // questions.push(QEdit.question);
            questionsService.putAllQuestions(questions);
        }
    };

    QEdit.addAnswer = function () {
        if (!QEdit.question.answers) {
            QEdit.question.answers = [];
        }
        let temp = {text: "", id: ""};
        temp.id = counter;
        counter++;
        QEdit.question.answers.push(temp);
    };

    QEdit.Delete = function (index) {
        if (QEdit.question.answers && index) {
            QEdit.question.answers.splice(index, 1);
        }
    };
}]);

questionsController.directive('newQuestion', function () {
    return {
        restrict: "E",
        scope: {questionsCounter: '<'},
        bindings: {questionsCounter: '<'},
        templateUrl: 'view/newQuestion.html',
        controller: 'questionAdd',
    }
});


questionsController.controller('questionsListView', ['$scope', 'questionsService', function ($scope, questionsService) {
    let QList = this;
    QList.questions = questionsService.getAllQuestions();
    QList.filteredList = [];
    QList.currentPage = 1;
    QList.numPerPage = 2;
    QList.maxSize = 5;

    QList.numPages = function () {
        return Math.ceil(QList.questions.length / QList.numPerPage);
    };

    function refresh(){
        let begin = ((QList.currentPage - 1) * QList.numPerPage);
        let end = begin + QList.numPerPage;
        QList.filteredList = QList.questions.slice(begin, end);
    }

    QList.previous = function () {
        if (QList.currentPage > 1) {
            QList.currentPage--;
        }
        refresh();
    };

    QList.next = function () {
        if (QList.currentPage < QList.numPages()) {
            QList.currentPage++;
        }
        refresh();
    };

    refresh();

    QList.questionTypeOptions = ['Behavioral', 'Opnion', 'Welcome & Introduction'];
}]);


// questionsController.directive('nothing', function(){
//     function linkfn(scope, element, attrs){
//
//         // scope.$watch(
//         // function () { return $('#sortable').find( "div.item" )[0].id },
//         // function (newValue, oldValue) {
//         //     if (newValue !== oldValue) {
//         //     }
//         // });
//     }
//   return {
//     restrict: 'EA',
//     link: linkfn
//   };
// });