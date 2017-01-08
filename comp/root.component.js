function RootController(){
    console.log('Root component');
}

RootController.$inject = [];

angular.module('cbWebsite.rootComponent', []).component('rootComponent', {
    templateUrl: 'comp/root.component.html',
    controller: RootController,
    controllerAs: "rootCtrl",
    bindings: {}
})