app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
  // If 404 go to index
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('/', {
    url: '/',
    templateUrl: 'app/components/landing-page/landing.html',
    pageTitle: 'KYH'
    // onEnter: ['$state', '$localstorage', function($state, $localstorage) {
    //
    //   /**
    //    * check if visitor has been here before and is a student, if is, magics.
    //    */
    //   var student = $localstorage.getObject('student');
    //   console.log(student);
    // }]
  })

  .state('/student', {
    url: '/student',
    templateUrl: 'app/components/student/student.html',
    pageTitle: 'KYH - studerande',
    controller: 'student'
  })

  .state('/visitor', {
    url: '/visitor',
    controller: 'visitorCtrl',
    templateUrl: 'app/components/visitor/visitor.html',
    pageTitle: 'KYH - Hej och välkommen'
  });
  
  
}]);
