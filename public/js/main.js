/**
 * Created by Samuel on 1/10/2016.
 */

var app = angular.module("tradingDisplayApp", ["firebase"]);

app.controller("tradingDisplayController", function($scope, $firebaseObject) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCQBdQ6CbmWSc1Xm1HNp78FGy6ZCm0JmVY",
        authDomain: "codeit-suisse-team-ace.firebaseapp.com",
        databaseURL: "https://codeit-suisse-team-ace.firebaseio.com",
        storageBucket: "codeit-suisse-team-ace.appspot.com",
        messagingSenderId: "976285187688"
    };
    firebase.initializeApp(config);
    var transactionsRef = firebase.database().ref('server/testing/transactionHistory');


    $scope.newTransactions = [];
    $scope.defaultString = "virtus tirmus";
    $scope.$watch('newTransactions', function (newValue, oldValue) {
        console.log("new array length is " + newValue.length);
    }, true);
    transactionsRef.on('child_added', function(childSnapshot, prevChildKey) {
        // code to handle new child.
        $scope.newTransactions.push(childSnapshot.val());
        console.log("now " + $scope.newTransactions.length);
        console.log($scope.newTransactions);
        $scope.defaultString = $scope.newTransactions[$scope.newTransactions.length-1].id;
        console.log($scope.defaultString);
    });
/*
    $scope.$watch('newTransactions', function (newValue, oldValue) {
        console.log("new array length is " + newValue.length);
    }, true);
*/
});