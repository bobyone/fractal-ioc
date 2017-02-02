/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const Config = require('../Config/Config');
const sep = require('path').sep;

const Container = function Container(path) {
  this.config = new Config();
  this.config.load(path);
  this.objectFiles = {};
  this.objectType = {};
  for (let i = 0; i < this.config.files.length; i += 1) {
    for (const objectName in this.config.files[i]) {
      if (!this.objectFiles[this.config.files[i][objectName].file]) {
        this.objectFiles[this.config.files[i][objectName].file] =
          require(this.config.applicationPath + sep + this.config.files[i][objectName].file);
      }
      if (!this.objectType[objectName]) {
        this.objectType[objectName] = this.objectFiles[this.config.files[i][objectName].file];
      }
    }
  }
};

module.exports = Container;
