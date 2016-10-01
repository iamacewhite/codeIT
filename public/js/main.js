/**
 * Created by Samuel on 1/10/2016.
 */

var app = angular.module("tradingDisplayApp", ["firebase"]);



app.controller("tradingDisplayController", ["$scope", "$firebaseArray",
    function($scope, $firebaseArray) {
        var messagesRef = new Firebase("https://codeit-suisse-team-ace.firebaseio.com/server/testing/transactionHistory");
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime
        $scope.messages = $firebaseArray(messagesRef);
        var query = messagesRef.orderByChild("fr").limitToLast(10);

        $scope.filteredMessages = $firebaseArray(query);
        $scope.recentTrans = [];
        $scope.$watch("filteredMessages",function(oldValue,newValue){
            for(var i=0; i<10; ++i){
                $scope.recentTrans[i] = {};

                var date = new Date($scope.filteredMessages[9-i].fr);
                var hours = String(date.getHours());
                console.log(hours);
                if (hours.length === 1){
                    hours = '0'+ hours;
                }
                var minutes = "0" + date.getMinutes();
                var seconds = "0" + date.getSeconds();
                var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                $scope.recentTrans[i].time = formattedTime;
                $scope.recentTrans[i].orderType = $scope.filteredMessages[9-i].message.order_type;
                $scope.recentTrans[i].price = $scope.filteredMessages[9-i].message.price;
                $scope.recentTrans[i].qty = $scope.filteredMessages[9-i].message.qty;
                $scope.recentTrans[i].side = $scope.filteredMessages[9-i].message.side;
                $scope.recentTrans[i].status = $scope.filteredMessages[9-i].message.status;
                $scope.recentTrans[i].ticker = $scope.filteredMessages[9-i].message.symbol;
            }
        },true);


    }
]);