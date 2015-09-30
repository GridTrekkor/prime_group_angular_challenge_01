var app = angular.module("TwitterNames", []);

app.controller("MainController", ["$scope", "$http", function ($scope, $http){
var nounArray =[], adjectiveArray = [], mainArray = [];


    $scope.getAdjectives = function(){
        $http({
            method: 'GET',
            url: 'assets/data/adjectives.json'
        }).then(function (res){
            $scope.adjectives = res.data;
            var i = 0;
            while(i < $scope.adjectives.length){
                adjectiveArray.push($scope.adjectives[i].adjective);
                i++;
            }

            shuffle(adjectiveArray);

            $scope.getNouns = function(){
                $http({
                    method: 'GET',
                    url: 'assets/data/nouns.json'
                }).then(function (res){
                    $scope.nouns = res.data;
                    var i = 0;
                    while(i < $scope.nouns.length){
                        nounArray.push($scope.nouns[i].noun);
                        i++;
                    }

                    shuffle(nounArray);

                    var j = 0;
                    while (j < adjectiveArray.length) {
                        mainArray[j] = toTitleCase(adjectiveArray[j]);
                        mainArray[j] += nounArray[j];
                        j++;
                    }
                    $scope.main = mainArray;

                });
            };
            $scope.getNouns();
        });


    };

    $scope.getAdjectives();

    function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function toTitleCase(str) { return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); }

}]);

