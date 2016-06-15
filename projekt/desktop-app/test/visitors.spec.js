describe("VisitorCtrl", function() {

  beforeEach(module('app'));
  var visitorCtrl, scope;
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    visitorCtrl = $controller('visitorCtrl', {$scope: scope});
  }));

  describe("validateForm", function() {

    beforeEach(function() {
      scope.education = 'MWD';
      scope.email = 'hallstrom.rasmus@gmail.com';
      scope.text = 'Hello World';
    });
    describe("Email input", function() {
      it('should be a string', function() {
        scope.email.should.be.a('string');
      });
    });

    describe("Text input", function() {
      it('should be a string', function() {
        scope.text.should.be.a('string');
      });
    });

    describe("Education key", function() {
      it('should be a string', function() {
        scope.email.should.be.a('string');
      });
      it('should be 3 chars long', function() {
        scope.education.should.have.length(3);
      });
    });
    
    it('should return true if input fields and key are validated', function() {
      expect(scope.validateForm()).to.be.true;
    });

  });

});