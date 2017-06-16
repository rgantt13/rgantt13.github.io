//Controls much of the logic for the UI

/*
 * Clear the key from local storage.
 * This will cause the application to prompt for a key again.
 * Currently only used for testing purposes.
 */
function clearKey(){
  localStorage.removeItem("userKey");
  $('#clear-key').removeClass('btn-danger').addClass('btn-success')
  .addClass('disabled')
  .text('Key Cleared!')
}


/*
 * @param key: Key returned from FCAS_backend if valid key submitted.
 * @param status: HTTP status returned. 200 = valid request, 403 = forbidden
 *
 * Checks the http response to see if submitted key was valid
 */
function validateKey(key, status){
  if(key && status == 200){
    localStorage.setItem("userKey", key);
    localStorage.setItem("base", $('#instance').val());
    $('#key-modal').modal('hide');
    $('#loader').hide();
    toggleViewPage(0);
  }else if(status == 403){
    $('#invalid-key').removeClass('hidden');
  }else{
    alert('No response from server. Please try again later.')
  }
}

//Functions to run once the DOM has finished loading
$(document).ready(function(){
  //Check to see if the user has a key
  //If not, prompt for a key
  if(!localStorage.userKey){
     $('#key-modal').modal('show');
  }

  $('#dash-view').load('pages/dash.html');
  $('#threats-view').load('pages/threats.html');
  $('#config-view').load('pages/config.html');
  $('#attack-view').load('pages/visual-sed.html');
  $('#projector-view').load('pages/graph-view.html');

  $('#dash-view').hide();
  $('#threats-view').hide();
  $('#config-view').hide();
  $('#attack-view').hide();
  $('#projector-view').hide();
});


//////////////////////////////////////////////////////////////
//////////////////// ANUGLARJS CODE //////////////////////////
//////////////////////////////////////////////////////////////

/* Look up anything here in angular's documentation if confused */

//Initialize angularjs and add all plugins
var cyberApp = angular.module('cyberApp', ['ui.router']);

/*
 * State Machine to configure the application as a Single Page Application (SPA).
 * This allows for elements to be injected into the view without refreshing
 * the entire UI.
 *
 * Views are injected in index.html, meaning all paths are relative to idex.html
 */
cyberApp.config(function($stateProvider, $urlRouterProvider) {
  //What URL to go to when the current URL is not handled by any state
  $urlRouterProvider.otherwise('/');

  //The default sub-state to switch to when in current threats
  $urlRouterProvider.when('/threats', '/threats/description')

  $stateProvider

  //route for the home page
  .state('dash', {
    url: '/',
    templateUrl : 'pages/dash.html'
  })

  //route for the current threats page
  .state('threats', {
    url: '/threats',
    templateUrl : 'pages/threats.html',
  })

  //description sub-state of threats
  .state('threats.description', {
    url: '/description',
    templateUrl: 'pages/threats-description.html',
    controller: 'desc_ctrl'
  })

  //static analysis sub-state of threats
  .state('threats.static', {
    url: '/static',
    templateUrl: 'pages/threats-static.html'
  })

  //comparison sub-state of threats
  .state('threats.comparison', {
    url: '/comparison',
    templateUrl: 'pages/threats-comparison.html'
  })

  //dynamic analysis sub-state of threats
  .state('threats.dynamic', {
    url: '/dynamic',
    templateUrl: 'pages/threats-dynamic.html'
  })

  // route for the config page, defunct at the moment
  .state('config', {
    templateUrl : 'pages/config.html'
  });



})

//Controller for the <body> of the page
.controller('bodyCtrl', function($scope, $state) {
  $scope.updates = 0;
})
.controller('desc_ctrl', function($scope, $state) {
  $scope.detection_result = 'None Selected';
})
