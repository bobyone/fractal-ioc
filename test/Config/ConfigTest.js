const chai = require('chai');
const Config = require('../../lib/Config/Config');

chai.should();

describe('Config', () => {
  it('function load() : must load only one file in this case', (done) => {
    const config = new Config();
    config.load('test/Common/ConfigFiles/Config1.js');
    config.files.length.should.equal(1);
    done();
  });
  it('function load() : must load two file in this case', (done) => {
    const config = new Config();
    config.load('test/Common/ConfigFiles');
    config.files.length.should.equal(2);
    done();
  });
});
