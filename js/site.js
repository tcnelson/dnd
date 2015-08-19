$(function () {
  $('[data-toggle="popover"]').popover();

  $('.modifier').change(function() {
  	var value = $(this).val();
  	var modifier = $(this).data('modifier');

  	var calculated = Math.floor((value - 10) / 2);

  	var attributes = $('[data-modifier="' + modifier + '"]');  //'[data-modifier="strength"]'
  	for (var i = 1; i < attributes.length; i++){
		$(attributes[i]).val(calculated);
  	}
  });
})