const chai = require('chai');
const Config = require('../../lib/Config/Abstract/Config');

chai.should();

describe('Config', () => {
  it('function load() : must load only one file in this case', (done) => {
    const config = new Config();
    config.load('test/Common/ConfigFiles/Config1.json');
    config.baseFiles.length.should.equal(1);
    done();
  });
  it('function load() : must load two file in this case (directory)', (done) => {
    const config = new Config();
    config.load('test/Common/ConfigFiles');
    config.baseFiles.length.should.equal(2);
    done();
  });
  it('function load() : must load two file in this case (array)', (done) => {
    const config = new Config();
    const files = [];
    files.push('test/Common/ConfigFiles/Config1.json');
    files.push('test/Common/ConfigFiles/Config2.json');
    config.load(files);
    config.baseFiles.length.should.equal(2);
    done();
  });
  it('function absbract processFiles() : must generate an exception', (done) => {
    let exception = false;
    try {
      const config = new Config();
      config.processFiles();
    } catch (e) {
      exception = true;
    }
    exception.should.equal(true);
    done();
  });
});
