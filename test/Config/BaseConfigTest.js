const chai = require('chai');
const BaseConfig = require('../../lib/Config/BaseConfig');

chai.should();

describe('BaseConfig', () => {
  it('function processFiles() : must load only one file in this case', (done) => {
    const config = new BaseConfig();
    config.load('test/Common/ConfigFiles/Config1.json');
    config.processFiles();
    config.makeFiles.length.should.equal(1);
    done();
  });
  it('function processFiles() : must load two file in this case (directory)', (done) => {
    const config = new BaseConfig();
    config.load('test/Common/ConfigFiles');
    config.processFiles();
    config.makeFiles.length.should.equal(2);
    done();
  });
  it('function processFiles() : must load two file in this case (array)', (done) => {
    const config = new BaseConfig();
    const files = [];
    files.push('test/Common/ConfigFiles/Config1.json');
    files.push('test/Common/ConfigFiles/Config2.json');
    config.load(files);
    config.processFiles();
    config.makeFiles.length.should.equal(2);
    done();
  });
  it('function processFiles() : must not generate an exception', (done) => {
    let exception = false;
    try {
      const config = new BaseConfig();
      config.processFiles();
    } catch (e) {
      exception = true;
    }
    exception.should.equal(false);
    done();
  });
});
