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
	STNET.setupPageTransitions();
	STNET.setupSkrollr();
	STNET.setupEvents();
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
			'data-50p' :"",
	    "data-100p":"transform:translate(-50%,0%);",
	    "data-150p":"",
	    "data-200p":"transform:translate(-100%,0%);",
	    "data-250p":"",
	    "data-300p":"transform:translate(-150%,0%);"			
		});
};

STNET.setupPageTransitions = function() {

	$('.slide-1')	
		.attr({
      // "data-0"								  :"opacity: 1",
      // "data--100-center-top"   :"opacity: 0",
      // "data--100-center-bottom":"opacity: 0;"			
		});	

	$('.slide-2')	
		.attr({

		});		

	$('#caption-1')
		.attr({
	    'data-40p': "opacity: 1; transform:translate(0px,0px);",
	    'data-70p': "opacity: 0; transform:translate(0px,-100%);",
	    'data-anchor-target': "#helper"			
		});			

	$('#caption-2')
		.attr({
	    'data-130p': "opacity: 1; transform:translate(0px,0px);",
	    'data-180p': "opacity: 0; transform:translate(0px,-100%);",
	    'data-250p': "",
	    'data-anchor-target': "#helper"			
		});		
};

STNET.setupEvents = function() {

};

STNET.setupSkrollr = function() {
  if ( !(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ) {
    s = skrollr.init({
	    smoothScrolling: true,
      forceHeight: false
    });
    this.setupSkrollrMenu(s);
  } else {  	
	  s = skrollr.init({
	    smoothScrolling: true,
		  forceHeight: true	  	
	  });   
	  this.setupSkrollrMenu(s); 
  } 
};

STNET.setupSkrollrMenu = function(s) {

	skrollr.menu.init(s, {
	    //skrollr will smoothly animate to the new position using `animateTo`.
	    animate: true,

	    //The easing function to use.
	    easing: 'sqrt',

	    //Multiply your data-[offset] values so they match those set in skrollr.init
	    scale: 2,

	    //How long the animation should take in ms.
	    duration: function(currentTop, targetTop) {
	        //By default, the duration is hardcoded at 500ms.
	        return 500;

	        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
	        //return Math.abs(currentTop - targetTop) * 10;
	    },

	    //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
	    //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
	    handleLink: function(link) {
	        // return 400;//Hardcoding 400 doesn't make much sense.
	    },

	    //By default skrollr-menu will only react to links whose href attribute contains a hash and nothing more, e.g. `href="#foo"`.
	    //If you enable `complexLinks`, skrollr-menu also reacts to absolute and relative URLs which have a hash part.
	    //The following will all work (if the user is on the correct page):
	    //http://example.com/currentPage/#foo
	    //http://example.com/currentDir/currentPage.html?foo=bar#foo
	    ///?foo=bar#foo
	    complexLinks: true,

	    //This event is triggered right before we jump/animate to a new hash.
	    change: function(newHash, newTopPosition) {
	        //Do stuff
	    },

	    //Add hash link (e.g. `#foo`) to URL or not.
	    updateUrl: true //defaults to `true`.
	}); 	

	return skrollr.menu
}

window.ready = STNET.initialize();
