const process = require('process');
const fs = require('fs');
const sep = require('path').sep;

/**
 * @description Config - Base class for all configuration
 * @constructor
 */
const Config = function Config() {
  this.applicationPath = process.cwd();
  this.baseFiles = [];
  this.makeFiles = [];
};

/**
 * @description Load a json file or all json file into the specified directory
 * @description The path must be setting at the base start application
 * @function
 * @param  {String|Array} path the path to load or an array of path to load
 */
Config.prototype.load = function load(path) {
  if (Array.isArray(path)) {
    for (let i = 0; i < path.length; i += 1) {
      this.load(path[i]);
    }
  } else if (fs.statSync(this.applicationPath + sep + path).isDirectory()) {
    const filesToLoad = fs.readdirSync(this.applicationPath + sep + path);
    filesToLoad.forEach((file) => {
      this.load(path + sep + file);
    });
  } else {
    const fileToLoad = JSON.parse(fs.readFileSync(this.applicationPath + sep + path, 'utf8'));
    this.baseFiles.push(fileToLoad);
  }
};

/**
 * @description transform loaded file to the right format as define into documentation
 */
Config.prototype.processFiles = function processFiles() {
  throw new Error('You must implement this function');
};

/**
 * @description The base configuration module
 * @module Config
 */
module.exports = Config;
