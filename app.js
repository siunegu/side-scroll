'use strict';

var STNET = STNET || {};
/* Elements */
let world, worldTag;
/* Lib */
let s;
/* Mods */
STNET.initialize = function() {
	STNET.getElements();
	STNET.setupSideScroll();
	STNET.skrollr();
};

STNET.getElements = function() {
	worldTag = '#world-container';
	world = document.querySelector('#world-container');
};

STNET.setupSideScroll = function() {
	/* Note: 
	 * 'data-100p' means '%' offset
	 */
	$('#slides')
		.attr({
			'data-0'   :'transform:translate(0%,0%);',
	    "data-100p":"transform:translate(-50%,0%);",
	    "data-200p":"transform:translate(-100%,0%);",
	    "data-300p":"transform:translate(-150%,0%);"			
		});
};

STNET.setupPageTransitions = function() {

	$('.slide-1')	
		.attr({
      "data-center"			:"opacity: 1",
      "data-center-top" :"opacity: 0",
      "data--100-bottom":"opacity: 0;"			
		});	
};

STNET.skrollr = function() {
  if ( !(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ) {
    skrollr.init({
      forceHeight: false
    });
  } else {  	
	  s = skrollr.init({
		  forceHeight: true	  	
	  });    
  }
};


window.ready = STNET.initialize();
