(function(){

$.ajax({
	url: 'includes/body.html',
	type: 'GET',
	dataType: 'html',
})
.done(function(data) {
	$("#page").append(data);
	$(".preloader").fadeOut();
});

$.ajax({
	url: 'includes/footer.html',
	type: 'GET',
	dataType: 'html',
})
.done(function(data) {
	$("#footer").append(data);
});


$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show');
});





$.ajax({
	url: 'js/images.json',
	type: 'GET',
	dataType: 'json'
})
.always(function(data) {
	$.each( data, function( key, val ) {
	$(".portfolio-container").append('<div class="col-xs-12 col-sm-6 col-md-3 col-lg-3 col-xlg-3 min-height-thumbnail"><a id="single_image" href="img/uploads/' + val + '" class="thumbnail"><img class="img-responsive" src="img/uploads/' + val + ' " alt=" ' + key + '" class="img-rounded"></a></div>');
	$("a#single_image").fancybox({
		'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	true
	});	
})
.done(function(data) {
		$(".portfolio-preloader").fadeOut();
	});
});

		

$(document).on( 'shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
    	$(".nav-tabs").css({"background-color":"transparent"})
    	$(".navbar-header").css({"background-color":"transparent"});
})

var iScrollPos = 0;
$(window).scroll(function () {
    var iCurScrollPos = $(this).scrollTop();
    if (iCurScrollPos > iScrollPos) {
    	$(".nav-tabs").css({"background-color":"transparent"})
    	$(".navbar-header").css({"background-color":"transparent"});
    	$(".nav-tabs").css({"display":"none"});
        //Scrolling Down
    } else {
    	$(".nav-tabs").css({"display":"block"});
    	$(".navbar-header").css({"background-color":"#fff"});
    	$(".nav-tabs").css({"background-color":"#fff"})
       //Scrolling Up
    }
    iScrollPos = iCurScrollPos;
});





})()