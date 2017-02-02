const util = require('util');
const Config = require('./Abstract/Config');


/**
 * @constructor
 */
const BaseConfig = function BaseConfig() {
  Config.apply(this, []);
};

util.inherits(BaseConfig, Config);


/**
 * @description See {Config} for more information
 * @override
 * @function
 */
BaseConfig.prototype.processFiles = function processFiles() {
  for (let i = 0; i < this.baseFiles.length; i += 1) {
    this.makeFiles.push(this.baseFiles[i]);
  }
};

/**
 * @description the more simple configuration implementation
 * @module BaseConfig
 */
module.exports = BaseConfig;
