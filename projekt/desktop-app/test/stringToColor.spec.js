describe("stringToColor", function() {
  beforeEach(function() {
  });
  afterEach(function() {
  });
  it('should be a string', function() { 
    expect(stringToColor('a')).to.be.a('string');
    

  });

  it('should be exactly 7 in length', function() { 
    expect(stringToColor('a')).to.have.lengthOf(7);
  });
});