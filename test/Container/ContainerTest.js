const chai = require('chai');
const Container = require('../../lib/Container/Container');

chai.should();

describe('Container', () => {
  it('construct() : must load only one configuration file in this case', (done) => {
    const container = new Container('test/Common/ConfigFiles/Config1.json');
    Object.keys(container.loadedFiles).length.should.equal(1);
    Object.keys(container.objectDefinition).length.should.equal(2);
    done();
  });
  it('construct() : must load two configuration file in this case', (done) => {
    const container = new Container('test/Common/ConfigFiles');
    Object.keys(container.loadedFiles).length.should.equal(1);
    Object.keys(container.objectDefinition).length.should.equal(4);
    done();
  });
});
