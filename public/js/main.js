/**
 * Created by Samuel on 1/10/2016.
 */

var app = angular.module("tradingDisplayApp", ["firebase"]);

app.controller("tradingDisplayController", function($scope, $firebaseObject) {
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/data");
    // download the data into a local object
    var syncObject = $firebaseObject(ref);
    // synchronize the object with a three-way data binding
    // click on `index.html` above to see it used in the DOM!
    syncObject.$bindTo($scope, "data");
});