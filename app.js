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
		init: init
	}
}();

STNET.aaron = function() {
	const aaron = {
		selector: '#tiny-aaron-container',
		states: {
			idle:       idle,
			walking:    walking,
			despondent: despondent,
			despondentLooksAtScreen: despondentLooksAtScreen,
			typingFast: typingFast
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

		if ( state === aaron.states.despondentLooksAtScreen )
			aaron.states.despondentLooksAtScreen()		

		if ( state === aaron.states.typingFast )
			aaron.states.typingFast()

	};

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
		$(aaron.selector).attr('class', 'tiny-aaron-despondent-looks-at-screen');
		setTimeout( function() { $(aaron.selector).attr('class', 'tiny-aaron-despondent-looks-at-screen-freeze'); }, 660);
	};

	function typingFast () {
		$(aaron.selector).attr('class', 'tiny-aaron-typing-fast');		
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

STNET.animations = function() {

	var scrollAmount,
			totalHeight,
			percentageScrolled,
			timelineSections = {
				enteringTimesheets: (percentageScrolled <= 300)
			};


	function timeline () {
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
		  element: document.getElementById('despondent-looks-at-screen'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('despondent-looks-at-screen')
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
				} else {
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.despondentLooksAtScreen ); 
				}
		  }
		});

		var beginWalk = new Waypoint({
		  element: document.getElementById('begin-idle-state'),
		  handler: function(direction) {
		  	if ( (direction === 'down') ) {
		  		console.log('idle')
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.idle ); 
				} else {
					STNET.aaron.clearState(); 
					STNET.aaron.setState( STNET.aaron.states.idle ); 
				}
		  }
		});
	};

	return timeline();

}();

window.ready = STNET.setup.init();