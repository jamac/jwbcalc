$(document).ready(function()
{

	isNumber = function(val)
	{
		return !isNaN(parseInt(val, 10));
	}

	// Ignore non-numeric paste data
	$('#damage').on('paste', function(e)
	{
		var paste = (e.originalEvent || e).clipboardData.getData('text/plain');
		if(paste && !isNumber(paste))
		{
 			e.preventDefault();
 		}
	});

	// Ignore non-numeric key data
	$('#damage').on('keypress', function(e)
	{
 		if(e.which && e.which > 27 && !isNumber(String.fromCharCode(e.which)))
 		{
 			e.preventDefault();
 		}
	});

	$('#damage').on('input', function(e)
	{
		var rows = '';
		var damage = e.target.value;

		// Ensure damage is numeric
		if(!isNumber(damage))
		{
 			e.preventDefault();
		}

		for(attacks = 1; attacks <= 8; attacks++)
		{
			var modifier = (attacks < 8) ? 1.0 : 0.5;
			var base = damage * (attacks + (attacks * (0.2 * (attacks - modifier))));
			rows = rows + '<tr>\n';
			rows = rows + '	<td class="attacks">' + attacks + '</td>\n';
			rows = rows + '	<td class="even">' + Math.ceil(base) + '</td>\n';
			rows = rows + '	<td class="plus50">' + Math.ceil(base*1.5) + '</td>\n';
			rows = rows + '	<td class="less50">' + Math.ceil(base*0.5) + '</td>\n';
			rows = rows + '</tr>\n';
		}

 		$('#details').html(rows);

	});

	$('#damage').trigger('input');

});
