/**
 * Created by Samuel on 1/10/2016.
 */

var app = angular.module("tradingDisplayApp", ["firebase"]);


app.controller("tradingDisplayController", ["$scope", "$firebaseArray","$interval","$http",
    function ($scope, $firebaseArray,$interval,$http) {
        var messagesRef = new Firebase("https://codeit-suisse-team-ace.firebaseio.com/server/testing/transactionHistory");
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime
        $scope.messages = $firebaseArray(messagesRef);
        var query = messagesRef.orderByChild("fr").limitToLast(10);

        $scope.filteredMessages = $firebaseArray(query);
        $scope.recentTrans = [];
        $scope.$watch("filteredMessages", function (oldValue, newValue) {
            for (var i = 0; i < 10; ++i) {
                $scope.recentTrans[i] = {};

                var date = new Date($scope.filteredMessages[9 - i].fr);
                var hours = String(date.getHours());
                console.log(hours);
                if (hours.length === 1) {
                    hours = '0' + hours;
                }
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                $scope.recentTrans[i].time = formattedTime;
                $scope.recentTrans[i].orderType = $scope.filteredMessages[9 - i].message.order_type;
                $scope.recentTrans[i].price = $scope.filteredMessages[9 - i].message.price;
                $scope.recentTrans[i].qty = $scope.filteredMessages[9 - i].message.qty;
                $scope.recentTrans[i].side = $scope.filteredMessages[9 - i].message.side;
                $scope.recentTrans[i].status = $scope.filteredMessages[9 - i].message.status;
                $scope.recentTrans[i].ticker = $scope.filteredMessages[9 - i].message.symbol;
            }
        }, true);


        var itv = $interval($http({
            method: 'GET',
            url: 'http://cis2016-dashboard.herokuapp.com/api/teams',
            headers: {"Host":"cis2016-dashboard.herokuapp.com",    "cache-control": "no-cache",
                "postman-token": "1b57b4ca-ce0f-7290-8a96-d6f47d34850d"}
        }).then(function successCallback(response) {
            console.log(response);
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        }), 3000);

    }
]);

angular.module("app", ["chart.js"]).controller("BarCtrl", function ($scope) {
  $scope.labels = ['0005', '0386', '0388', '3988'];
  $scope.series = ['Holding', 'Reserved'];

  $scope.data = [
    [65, 59, 80, 81],
    [28, 48, 40, 19]
  ];

  
});



