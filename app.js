'use strict';

var STNET = STNET || {};

STNET.app = function() {

	/* Elements */
	let world, worldTag;
	
	/* Lib */
	let s;

	/* Mods */
	function initialize () {
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
		/* Note: 
		 * 'data-100p' means '%' offset
		 */
		$('#slides')
			.attr({
				'data-0'   : 'transform:translate(100%,0%);',
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
		console.log( 'target hash '+e.currentTarget.hash   )
		console.log( 'target offset left '+ $(e.currentTarget.hash).offset().left )
		console.log( 'target offset top ' + Math.abs( $(e.currentTarget.hash).offset().top ))
		console.log('----')

		var scrollAmount = Math.abs( parseInt($(e.currentTarget.hash).css('left')) );
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



	window.ready = initialize();
}();