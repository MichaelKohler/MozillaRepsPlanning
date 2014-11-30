angular
  .module('app', [
  'ui.router',
  'LocalStorageModule'
])

.constant('config', {
  'name': 'development',
  'apiUrl': 'http://localhost:3000'
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'scripts/routes/home/home.tpl.html',
    controller: 'HomeCtrl',
    controllerAs: 'ctrl'
  });

  $urlRouterProvider.otherwise('home');

})

.run(function(AuthService, SocketService, $state) {

  // check if the user has an active session
  AuthService.hasSession().then(function() {}, function() {
    $state.go('login');
  });
});