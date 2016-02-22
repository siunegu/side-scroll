'use strict';

var APP = APP || {};
/* Elements */
let world, worldTag;
/* Lib */
let s;
/* Mods */
APP.initialize = function() {
	APP.skrollr();
	APP.getElements();
	APP.manipulateEl();
};

APP.getElements = function() {
	worldTag = '#world-container';
	world = document.querySelector('#world-container');
};

APP.manipulateEl = function() {
	$(worldTag)
		// .attr({
		// 	'data-0':'transform:translate(0%,0%);',
		// 	'data-100p':'transform:translate(0%,-50%);',
		// });
};

APP.skrollr = function() {
  s = skrollr.init();    
};



window.ready = APP.initialize();

