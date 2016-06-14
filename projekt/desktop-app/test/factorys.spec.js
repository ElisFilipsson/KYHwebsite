describe("Factorys", function() {

  beforeEach(module('app'));

  var $calendar, $httpBackend;
  var url = 'http://localhost:4000/educations/';
  var param = 'MWD';
  beforeEach(inject(function (_$calendar_, _$httpBackend_) {
    $calendar = _$calendar_;
    $httpBackend = _$httpBackend_;
  }));

  describe("CalenderApi", function() {
    it('should GET schedule by education param ', function() {
      $httpBackend.expect('GET', url + param).respond(200);
      $calendar.getSchedule(param);
      expect($httpBackend.flush).to.not.throw();
    });

    it('should GET all schedules no param ', function() {
      $httpBackend.expect('GET', url).respond(200);
      $calendar.getSchedule('');
      expect($httpBackend.flush).to.not.throw();
    });
  });

});