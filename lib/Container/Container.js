/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const vm = require('vm');
const sep = require('path').sep;
const BaseConfig = require('../Config/BaseConfig');

const Container = function Container(path, Config = BaseConfig) {
  this.config = new Config();
  this.config.load(path);
  this.config.processFiles();
  this.objectFiles = {};
  this.objectType = {};
  for (let i = 0; i < this.config.makeFiles.length; i += 1) {
    for (const objectName in this.config.makeFiles[i]) {
      if (!this.objectFiles[this.config.makeFiles[i][objectName].file]) {
        this.objectFiles[this.config.makeFiles[i][objectName].file] =
          require(this.config.applicationPath + sep + this.config.makeFiles[i][objectName].file);
      }
      if (!this.objectType[objectName]) {
        this.objectType[objectName] = this.objectFiles[this.config.makeFiles[i][objectName].file];
      }
    }
  }
};

module.exports = Container;
