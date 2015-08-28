$(function () {
  $('[data-toggle="popover"]').popover();

  $('.modifier').change(function() {
  	var target = $(this).data('target');

  	var attributes = $(target);  
  	for (var i = 0; i < attributes.length; i++){
		updateAttribute(attributes[i]);
  	} 
  });

  $('.proficiency').change(function() {
  	var target = $(this).data('target');

  	updateAttribute(target);
  	} 
  });

  function updateAttribute (el) {
  	var proficiencyBonus = $('#proficiency-bonus').val();
  	var modifier = $(el).data('modifier');
  	var value = $(modifier).val();	
  	
  	var proficiencySelector = $(el).data('proficiency');        
    var proficient = $(proficiencySelector).attr('checked');

  	if (proficient) {
  		var calculated = Math.floor((value - 10) / 2) + proficiencyBonus;
  	}

  	else {
  		var calculated = Math.floor((value - 10) / 2);
  	}

  	$(el).val(calculated);
  	
  }
})