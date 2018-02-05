$(function() {

	$("body").addClass("loaded");

	if (typeof $.cookie('welcomeback') === 'undefined') $("#autominebuttons").removeClass('hidden')

	var CookieSet = $.cookie('welcomeback', 'liam');

});


/***********************************************
*        NProgress Settings
***********************************************/

// start load bar
NProgress.start();

// end loading bar 
NProgress.done();