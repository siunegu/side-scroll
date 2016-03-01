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
		    "data-200p": "transform:translate(-100%,0%);",
		    "data-250p": "",
		    "data-300p": "transform:translate(-150%,0%);"			
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
		    'data-anchor-target': "#timeline"			
			});			

		$('#caption-2')
			.attr({
		    'data-130p': "opacity: 1; transform:translate(0px,0px);",
		    'data-180p': "opacity: 0; transform:translate(0px,-100%);",
		    'data-250p': "",
		    'data-anchor-target': "#timeline"			
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
		init: init,
		setupNavEvents: setupNavEvents
	}
}();

STNET.aaron = function() {
	const aaron = {
		selector: '#tiny-aaron-container',
		states: {
			idle:       							idle,
			walking:    							walking,
			despondent: 					    despondent,
			despondentLooksAtScreen:  despondentLooksAtScreen,
			typingFast: 							typingFast,
			looksAtScreenTapsButton:  looksAtScreenTapsButton
		} 
	};
	
	/* Animation Setter Method */ 

	function setState (state) {

		if ( state === aaron.states.idle )
			aaron.states.idle()

		if ( state === aaron.states.walking )
			aaron.states.walking()

		if ( state === aaron.states.despondent )
			aaron.states.despondent()

		if ( state === aaron.states.despondentLooksAtScreen )
			aaron.states.despondentLooksAtScreen()		

		if ( state === aaron.states.typingFast )
			aaron.states.typingFast()	

		if ( state === aaron.states.looksAtScreenTapsButton )
			aaron.states.looksAtScreenTapsButton()

	};

	/* States with CSS classes - keyframe animations */ 

	function idle () {
		$(aaron.selector).attr('class', 'tiny-aaron-idle')
	};

	function walking () {
		$(aaron.selector).attr('class', 'tiny-aaron-walk');
	};

	function despondent () {
		$(aaron.selector).attr('class', 'tiny-aaron-despondent');
	};

	function despondentLooksAtScreen () {
		$(aaron.selector).attr('class', 'tiny-aaron-looks-at-screen');
		waitThenFreeze(660);
	};

	function typingFast () {
		$(aaron.selector).attr('class', 'tiny-aaron-typing-fast');		
	};

	function looksAtScreenTapsButton () {
		$(aaron.selector).attr('class', 'tiny-aaron-looks-at-screen-taps-button');		
	};



	/* Utility Methods */ 

	function waitThenFreeze (milliseconds) {
		setTimeout( function() { 
			$(aaron.selector).attr('class', 'tiny-aaron-looks-at-screen-freeze'); 
		}, milliseconds);		
	};

	function clearState() {
		$(aaron.selector).removeClass();
	};

	return {
		selector:  			aaron.selector,
		states:    		  aaron.states,
		setState:   		setState,
		clearState: 		clearState
	}
}();

STNET.waypoints = function() {

	var scrollAmount,
			totalHeight,
			percentageScrolled,
			timelineSections = {
				enteringTimesheets: (percentageScrolled <= 300)
			};


	function initTimeline () {
		$(document).on({
			ready:  registerWaypoints
		});
	};

	function registerWaypoints () {
		var despondent = new Waypoint({
		  element: document.getElementById('despondent'),
		  handler: function(direction) {
		  	if ( (direction === 'down') || (direction === 'up') )
		  		console.log('despondent')
					STNET.aaron.setState( STNET.aaron.states.despondent );		    
		  }
		});
				
		var despondentLooksAtScreen = new Waypoint({
		  element: document.getElementById('looks-at-screen'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('looks-at-screen')
					STNET.aaron.setState( STNET.aaron.states.despondentLooksAtScreen ); 
				} else {
					STNET.aaron.setState( STNET.aaron.states.despondent ); 					
				}
		  },
		  offset: 10
		});

		var typingFast = new Waypoint({
		  element: document.getElementById('typing-fast'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('typing fast')
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.typingFast ); 
				} else if ( (direction === 'up') ) {
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.despondent ); 
				}
		  }
		});

		var looksAtScreenTapsButton = new Waypoint({
		  element: document.getElementById('looks-at-screen-taps-button'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('looks at screen taps button')
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.looksAtScreenTapsButton ); 
				} else if ( (direction === 'up') ) {
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.typingFast ); 
				}
		  }
		});

		var beginWalk = new Waypoint({
		  element: document.getElementById('walk-idle-loop'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('idle')
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.idle ); 
					STNET.walkLogic.initWalkHandler();
				} else {
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.typingFast ); 
				}
		  }
		});
	};

	return initTimeline();

}();

STNET.walkLogic = function() {

	var scrollTop;

	function initWalkHandler () {
		$(document).on({
			scroll: processWalk
		});
	};

	function processWalk (e) {
		walkDirection();
		walkThenIdle();
	};

	function walkThenIdle () {

		STNET.aaron.clearState(); 
		STNET.aaron.setState( STNET.aaron.states.walking ); 		

		var walkInterval = setTimeout( function() { 
			idle();
			this.clearTimeout( walkInterval );
	  }, 500 );	

	  var idle = function () {
			STNET.aaron.clearState(); 
			STNET.aaron.setState( STNET.aaron.states.idle ); 				  
	  }

	  var clearIntervals = function () {
	  	window.clearTimeout(walkInterval);
	  }
	};
	
	// Clear Walk Idle Cycle once above this section.
	function walkDirection () {
		var walkDirectionWaypoint = new Waypoint({
		  element: document.getElementById('walk-idle-loop-clear'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
  				console.log('right');
				} else {					
  				console.log('up');
  				STNET.aaron.clearState(); 
				} 
		  }
		});		
	};

	return { initWalkHandler: initWalkHandler }

}();


window.ready = STNET.setup.init();