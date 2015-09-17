$(function () {
  $('[data-toggle="popover"]').popover();

  $('.modifier').change(function() {					// recalculate skill checks and saves when modifier changes
  	var target = $(this).data('target');

  	var attributes = $(target);  
  	for (var i = 0; i < attributes.length; i++){
		if ($(attributes[i]).hasClass('bonus')) {
			updateBonus(attributes[i]);
		}

		else {
			updateAttribute(attributes[i]);
		}
	}
  });

  $('.proficiency').change(function() {					// recalculate skill checks and saves when proficiency status changes
  	var target = $(this).data('target');
  	var el = $(target)
  	updateAttribute(el);
  });

  $('#proficiency-bonus').change(function () {			// recalculate skill checks and saves when proficiency bonus changes
  	var skills = $('.skill');

  	for (var i = 0; i < skills.length; i++) {
  		if ($(skills[i]).hasClass('bonus')) {
			updateBonus(skills[i]);
		}

		else {
			updateAttribute(skills[i]);
		}
  	}
  });

  $('#dexterity').change(function () {					// make dexterity bonus the initiative value
  	var value = $(this).val();
  	var calculated = Math.floor((value - 10) / 2);
  	
  	if (calculated < 0) {
  		$('#initiative').val(calculated);
  	}

  	else {
  		$('#initiative').val('+' + calculated);
  	}
  });

  $(".weapon-mod").change(function () {					// recalculate the weapon attack bonus when the weapon modifier changes
  	updateWeaponMod(this);										
  });

  $('.spell-modifier').change(function () {
  	updateSpellMod(this);
  });

  function updateAttribute (el) {								// how to calculate skill checks and saves
  	var proficiencyBonus = $('#proficiency-bonus').val();
  	var modifier = $(el).data('modifier');
  	var value = $(modifier).val();	
  	
  	var proficiencySelector = $(el).data('proficiency');        
    var proficient = $(proficiencySelector).is(':checked');

  	if (proficient) {
  		var calculated = Math.floor((value - 10) / 2) + Number(proficiencyBonus);
  	}
  	else {
  		var calculated = Math.floor((value - 10) / 2);
  	}

  	if (calculated < 0) {
  		$(el).val(calculated);
  	}	
  	else {
  		$(el).val('+' + calculated);
  	}
  	
  }

  function updateBonus (el) {								// how to calculate bonuses (strength, dex, etc.)
  	var modifier = $(el).data('modifier');
  	var value = $(modifier).val();

  	var calculated = Math.floor((value-10)/2);

  	if (calculated < 1) {
  		$(el).text(calculated);
  	}

  	else {
  		$(el).text('+' + calculated);
  	}
  }

  function updateWeaponMod (el) {								// how to recalculate weapon attack bonus 
  	var option = $(el).val();
  	var attackBonus = $(el).closest('.weapon-row').find('.bonus');						

  	$(attackBonus).removeClass('strength dexterity constitution intelligence wisdom charisma');
  	$(attackBonus).addClass(option);
  	$(attackBonus).data('modifier' , '#' + option);
  	$('#' + option).change();
  }

  function updateSpellMod (el) {
  	var option = $(el).val();
  	var proficiencyBonus =$('#proficiency-bonus').val();
  	var spellAttackBonus = $('#spell-attack-bonus');
  	var spellSaveDC = $('#spell-save-dc');

  	$(spellAttackBonus).removeClass('strength dexterity constitution intelligence wisdom charisma');
  	$(spellAttackBonus).addClass(option);
  	$(spellAttackBonus).data('modifier' , '#' + option);
  	
  	$(spellSaveDC).removeClass('strength dexterity constitution intelligence wisdom charisma');
  	$(spellSaveDC).addClass(option);
  	$(spellSaveDC).data('modifier' , '#' + option);

  	$('#' + option).change();

  	$(spellAttackBonus) += Number (proficiencyBonus);

  	$(spellSaveDC) = $(spellSaveDC) + 8 + Number (proficiencyBonus);
  }
})