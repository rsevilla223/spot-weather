$('.nav-side .nav-toggle').on('click', function(e) {
  e.preventDefault();
  $(this).parent().toggleClass('nav-open');
});
//close navigation bar when screen clicked
$('.updateZip').on('click', function(e) {
  e.preventDefault();
  $('.nav-side').toggleClass('nav-closed');
});
