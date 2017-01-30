const process = require('process');
const fs = require('fs');
const sep = require('path').sep

const Config = function Config() {
  this.applicationPath = process.cwd();
  this.files = [];
};

Config.prototype.load = function load(path) {
  if (fs.statSync(this.applicationPath + sep + path).isDirectory()) {
    const filesToLoad = fs.readdirSync(this.applicationPath + sep + path);
	filesToLoad.forEach((file) => {
      const fileToLoad = require(this.applicationPath + sep + path + sep + file);
      this.files.push(fileToLoad);
	});
  } else {
    const fileToLoad = require(this.applicationPath + sep + path);
    this.files.push(fileToLoad);
  }
};

module.exports = Config;
