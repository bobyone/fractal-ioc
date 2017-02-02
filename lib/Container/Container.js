/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-restricted-syntax */
const vm = require('vm');
const fs = require('fs');
const sep = require('path').sep;
const BaseConfig = require('../Config/BaseConfig');

/**
 * @description Load program structure
 * @constructor
 * @param  {type} path                description
 * @param  {type} Config = BaseConfig description
 */
const Container = function Container(path, Config = BaseConfig) {
  this.config = new Config();
  this.config.load(path);
  this.config.processFiles();
  this.loadedFiles = {};
  this.scriptFiles = {};
  this.objectType = {};
  for (let i = 0; i < this.config.makeFiles.length; i += 1) {
    for (const objectName in this.config.makeFiles[i]) {
      if (!this.loadedFiles[this.config.makeFiles[i][objectName].file]) {
        this.loadedFiles[this.config.makeFiles[i][objectName].file] =
          require(this.config.applicationPath + sep + this.config.makeFiles[i][objectName].file);
        this.scriptFiles[this.config.makeFiles[i][objectName].file] =
          vm.Script(
            fs.readdirSync(this.config.applicationPath + sep + this.config.makeFiles[i][objectName].file),
            { displayErrors: true }
          );
        this.scriptFiles[this.config.makeFiles[i][objectName].file].runInThisContext({ displayErrors: true });
      }
      if (!this.objectType[objectName]) {
        this.objectType[objectName] = this.loadedFiles[this.config.makeFiles[i][objectName].file];
      }
    }
  }
};

/**
 * @module Container
 */
module.exports = Container;
