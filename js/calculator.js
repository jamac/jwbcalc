window.addEventListener('load', function()
{

	var damage = document.getElementById('damage');
	var detailsTable = document.getElementById('details');

	// Calculate attack damage
	var calcDamage = function(dmg, atk)
	{
		var modifier = (atk < 8) ? 1.0 : 0.5;
		return dmg * (atk + (atk * (0.2 * (atk - modifier))));
	}

	// Verify input is integer number
	var isNumber = function(val)
	{
		return !isNaN(parseInt(val, 10));
	}

	// Build calculation table
	var applyInput = function(e)
	{
		var rows = '';
		var max = damage.getAttribute('max') || 9999;
		var input = isNumber(damage.value) ? Math.min(damage.value, max) : 0;

		for(attacks = 1; attacks <= 8; attacks++)
		{
			base = calcDamage(input, attacks);
			rows = rows + '<tr>\n';
			rows = rows + '	<td class="attacks">' + attacks + '</td>\n';
			rows = rows + '	<td class="even">' + Math.ceil(base) + '</td>\n';
			rows = rows + '	<td class="plus50">' + Math.ceil(base*1.5) + '</td>\n';
			rows = rows + '	<td class="less50">' + Math.ceil(base*0.5) + '</td>\n';
			rows = rows + '</tr>\n';
		}

 		detailsTable.innerHTML = rows;

	};

	// Ignore non-numeric paste data
	var filterPaste = function(e)
	{
		var paste = (e.originalEvent || e).clipboardData.getData('text/plain');
		if(!paste || !isNumber(paste))
		{
 			e.preventDefault();
 		}
	}

	// Ignore non-numeric key data
	var filterKeypress = function(e)
	{
		var charCode = e.charCode;
		if(charCode != 0) {
			if(charCode < 48 || charCode > 57)
			{
				e.preventDefault();
			}
		}
	}

	damage.addEventListener('paste', filterPaste);
	damage.addEventListener('keypress', filterKeypress)
	damage.addEventListener('input', applyInput);

	applyInput();

});
