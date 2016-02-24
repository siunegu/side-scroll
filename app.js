'use strict';

var STNET = STNET || {};

STNET.setup = function() {

	/* Elements */
	let world, worldTag;
	
	/* Lib */
	let s;

	/* Mods */
	function init () {
		getElements();
		setupSideScroll();
		setupPageTransitions();
		setupSkrollr();
		setupEvents();
	};

	function getElements () {
		worldTag = '#world-container';
		world = document.querySelector('#world-container');
	};

	function setupSideScroll () {
		/* Note: 'data-100p' means '%' offset */
		$('#slides')
			.attr({
				'data-0'   : 'transform:translate(0%,0%);',
				'data-50p' : "",
		    "data-100p": "transform:translate(-50%,0%);",
		    "data-150p": "",
		    "data-200p": "transform:translate(-150%,0%);",
		    "data-250p": "",
		    "data-300p": "transform:translate(-200%,0%);"			
			});
	};

	function setupPageTransitions () {

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

	function setupEvents () {
		$('nav a').on( 'click', setupNavEvents );
	};

	function setupNavEvents (e) {
		$('body').scrollTop(  Math.abs( $(e.currentTarget.hash).offset().left) );
	};

	function setupSkrollr () {
	  if ( !(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera) ) {
	    s = skrollr.init({
		    smoothScrolling: true,
	      forceHeight: false
	    });    
	  } else {  	
		  s = skrollr.init({
		    smoothScrolling: true,
			  forceHeight: true	  	
		  });   	  
	  } 
	};

	return {
		init: init
	}
}();

STNET.aaron = function() {
	const aaron = {
		selector: '#tiny-aaron-container',
		states: {
			idle:       idle,
			walking:    walking,
			despondent: despondent
		} 
	};

	function setState (state) {
		/* Clear frames before running new ones */ 

		if ( state === aaron.states.idle )
			aaron.states.idle()

		if ( state === aaron.states.walking )
			aaron.states.walking()

		if ( state === aaron.states.despondent )
			aaron.states.despondent()

	};

	function idle () {
		$(aaron.selector).addClass('tiny-aaron-idle')
	};

	function walking () {
		$(aaron.selector).addClass('tiny-aaron-walk');
	};

	function despondent () {
		$(aaron.selector).addClass('tiny-aaron-despondent');
	};

	function clearState() {
		$(aaron.selector).removeClass();
	};

	return {
		selector:  			aaron.selector,
		states:     		aaron.states,
		setState:   		setState,
		clearState: 		clearState
	}
}();

STNET.animations = function() {

	var scrollAmount,
			timelineSections = {
				enteringTimesheets: (scrollAmount === 0)
			};


	function timeline () {
		$(document).on('scroll', processTimeline );
	};

	function processTimeline () {
		scrollAmount = $('body').scrollTop();
		console.log( scrollAmount );
		if ( enteringTimesheets ) 

	};

	return timeline();

}();

window.ready = STNET.setup.init();