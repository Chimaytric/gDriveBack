'use strict';

function HomeController(cbWebsiteData){
    //console.log('Home component');

    var vm = this;

    vm.data = [];

    vm.getData = function(){
        cbWebsiteData.getData().then(function(data){
            $.each(data.feed.entry, function(sectionIndex, sectionValue){
                var temp = sectionValue.content.$t.split(/, \w+: /);
                temp[0] = temp[0].slice(8, temp[0].length);
                vm.data[sectionValue.title.$t] = temp;
            });
        });
    }
}

HomeController.$inject = ['cbWebsiteData'];

angular.module('cbWebsite.homeComponent', ['smoothScroll']).component('homeComponent', {
    templateUrl: 'home/home.component.html',
    controller: HomeController,
    controllerAs: "homeCtrl",
    require: {
        parent: "^rootComponent"
    },
    bindings: {}
}).factory('cbWebsiteData', function($http){
    return {
        getData: function(){
            var documentID = "GoogleSpreadSheetId"; // Id of the document. Make sure the document has been "published for the web before".
            var url = 'https://spreadsheets.google.com/feeds/list/"+documentID+"/od6/public/values?alt=json';
            return $http({
                method: 'GET',
                url: url
            }).then(function(response){
                return response.data;
            });
        }
    }
});