/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const sep = require('path').sep;
const BaseConfig = require('../Config/BaseConfig');


/**
 * @function
 * @description Enable to load a subtype contained in a loaded file or module
 * @param  {type} definition     the file definition as it
 * @param  {type} subdefinitions the subdefinitions : a string with '.' separator
 * @return {Object}              the subdefinitions
 * @throw when the subdefinition does'nt exist.
 */
function getSubDefinition(definition, subdefinitions) {
  if (!subdefinitions) {
    return definition;
  }
  let obj = definition;
  const subdef = subdefinitions.split('.');
  for (let i = 0; i < subdef.length; i += 1) {
    obj = obj[subdef[i]];
    if (!obj) {
      throw new Error(`definitions ${subdefinitions} not exists`);
    }
  }
  return obj;
}

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
  this.objectDefinition = {};
  this.objectImplementationType = {};
  this.singletons = {};
  this.redondancyControl = {};
  const applicationPath = this.config.applicationPath + sep;
  for (let i = 0; i < this.config.makeFiles.length; i += 1) {
    const currentMakeFile = this.config.makeFiles[i];
    const objectKeys = Object.keys(currentMakeFile);
    for (let j = 0; j < objectKeys.length; j += 1) {
      const objectName = objectKeys[j];
      const currentObjectDefinition = currentMakeFile[objectName];
      if (currentObjectDefinition.file && currentObjectDefinition.module) {
        throw new Error(`Container : you cannot set a file and a module name into same object definition ${objectName}`);
      }
      if (!currentObjectDefinition.file && !currentObjectDefinition.module) {
        throw new Error(`Container : you must set a file or a module name into the object definition ${objectName}`);
      }
      let baseKey = null;
      if (currentObjectDefinition.file) {
        baseKey = currentObjectDefinition.file;
        if (!this.loadedFiles[baseKey]) {
          this.loadedFiles[baseKey] = require(applicationPath + baseKey);
        }
      } else {
        baseKey = currentObjectDefinition.module;
        if (!this.loadedFiles[baseKey]) {
          this.loadedFiles[baseKey] = require(baseKey);
        }
      }
      if (!this.objectDefinition[objectName]) {
        try {
          this.objectDefinition[objectName] =
            getSubDefinition(this.loadedFiles[baseKey], currentObjectDefinition.subtype);
        } catch (e) {
          throw new Error(`Container : error when loading ${objectName} --- ${e.message}`);
        }
      } else {
        throw new Error(`Container : the name ${objectName} is define several time`);
      }
      this.objectImplementationType[objectName] = 'construct';
      if (currentObjectDefinition.implementation === 'singleton') {
        this.objectImplementationType[objectName] = 'singleton';
      } else if (currentObjectDefinition.implementation === 'typeof') {
        this.objectImplementationType[objectName] = 'typeof';
      }
      this.redondancyControl[objectName] = false;
    }
  }
};

/**
 * @module Container
 */
module.exports = Container;
