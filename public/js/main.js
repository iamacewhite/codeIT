/**
 * Created by Samuel on 1/10/2016.
 */

var app = angular.module("tradingDisplayApp", ["firebase","chart.js"]);


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



app.controller("BarCtrl", ["$scope","$interval","$http",function ($scope,$interval,$http) {
  $scope.labels = ['0001','0005', '0386', '0388', '3988'];
  $scope.series = ['Holding', 'Reserved'];

  $scope.data = [
    [5, 65, 59, 80, 81],
    [6, 28, 48, 40, 19]
  ];

//   setInterval(function(){
//       request(
//         {
//               uri:"http://cis2016-teamtracker.herokuapp.com/api/teams/ub3xoKYYnv5007VCzJV_HA",
//               method:"GET"
//         }, 
//         function(error, response, body){
//             if (!error && response.statusCode == 200){
//                 obj=JSON.parse(body);
//                 $scope.data = [ [object["0001"],object["0005"],object["0386"],object["0388"],object["3988"]],
//                                 [object["0001_reserved"],object["0005_reserved"],object["0386_reserved"],object["0388_reserved"],object["3988_reserved"]]];
//             }
//   },3000);
    // var itv = $interval($http({
    //         method: 'GET',
    //         url: 'http://localhost',
    //     }).then(function successCallback(response) {
    //         obj=JSON.parse(body);
    //         $scope.data = [ [object["0001"],object["0005"],object["0386"],object["0388"],object["3988"]],
    //                         [object["0001_reserved"],object["0005_reserved"],object["0386_reserved"],object["0388_reserved"],object["3988_reserved"]]];
    //     }, function errorCallback(response) {
    //         // called asynchronously if an error occurs
    //         // or server returns response with an error status.
    //     }), 3000);

}]);



