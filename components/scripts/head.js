var jQuery = require('jQuery');
window.$ = jQuery;



$.ajax({
	url: 'includes/head.html',
	type: 'GET',
	dataType: 'html',
})
.done(function(data) {
	console.log(data);
})
.fail(function() {
	console.log("error");
})
.always(function() {
	console.log("complete");
});
