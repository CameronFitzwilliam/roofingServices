function load() {

}
window.onload = load;

$.ajax({
	url: 'includes/body.html',
	type: 'GET',
	dataType: 'html',
})
.done(function() {
	$(".preloader").fadeOut("slow");
});


$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show');
});

$.getJSON( "js/images.json", function( data ) {
  $.each( data, function( key, val ) {
  	$(".portfolio-container").append('<div class="col-xs-12 col-md-3"><a href="#" class="thumbnail img-repsonsive"><img src="img/uploads/' + val + ' " alt="..."></a></div>');
	  	$(".thumbnail").lazyload();
  });
});

