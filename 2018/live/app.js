var App = angular.module('App', ['ui.router']);

App.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
  
    .state('home', {
        url: '/home',
        templateUrl: 'home/index.html'
    })
    .state('schedule', {
        url: '/schedule',
        templateUrl: 'schedule/index.html'
    })
    .state('mentors', {
        url: '/mentors',
        templateUrl: 'mentors/index.html'
    })
    .state('judging', {
        url: '/judging',
        templateUrl: 'judging/index.html'
    })
    /*.state('resources', {
        url: '/resources',
        templateUrl: 'resources/index.html'
    });*/
});
App.run(function($rootScope, $templateCache) {
   $rootScope.$on('$viewContentLoaded', function() {
      $templateCache.removeAll();
   });
});
App.controller('schedule', function($scope, Schedule, $interval) {
  $scope.data = {};

  UpdateSchedule();

  $interval(function(){
    UpdateSchedule();
  }, 5000);

  function UpdateSchedule() {
    Schedule.getSchedule().then(ScheduleSuccess, ScheduleFail);
  }

  function ScheduleSuccess(res) {
    $scope.data.schedule = res.data;
  }
  function ScheduleFail(res) {
    console.log(res.data, "fail");
  }

});

App.controller('mentors', function($scope, Mentors, $interval) {
  $scope.data = {};

  UpdateMentors();

  $interval(function(){
    UpdateMentors();
  }, 5000);
  
  function UpdateMentors() {
    Mentors.getMentors().then(MentorSuccess, MentorFail);
  }

  function MentorSuccess(res) {
    $scope.data.mentors = res.data;
  }
  function MentorFail(res) {
    console.log(res.data, "fail");
  }
});

App.service('Schedule', function($http) {
  var API = "https://raw.githubusercontent.com/HackKean/2017-schedule/master/schedule.json";
  var self = this;

  self.getSchedule = function () {
    return $http.get(API);
  };
}) 

App.service('Mentors', function($http) {
  var API = "https://raw.githubusercontent.com/HackKean/2017-mentors/master/mentors.json";
  var self = this;

  self.getMentors = function () {
    return $http.get(API);
  };
}) 