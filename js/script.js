$(document).ready(function(){

	$(function () {
		$('.footable').footable();
		// addSpecialClasses();
		// console.log(addSpecialClasses());
	});

	$('#ticker-search').submit(function(){
		var ticker = $('#symbol').val();
		var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20("' + ticker + '")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json';

		$.getJSON(url, function(yahooResult){
			var stockInfo = yahooResult.query.results.quote;
			var newHTML;
			if(yahooResult.query.count > 1){
				for(i=0; i<yahooResult.query.count; i++){
					newHTML += updateTable(stockInfo[i]);
				}
			}else{
				newHTML = updateTable(stockInfo);
			}

			$('#ticker-body').html(newHTML);
			console.log(yahooResult);

			$(function () {
				$('.footable').footable();
			});
			addSpecialClasses();
 		});

		event.preventDefault();
	});
	function updateTable(thingToLoopThrough){
		var thisStockRow = '<tr><td>' + thingToLoopThrough.Symbol + '</td>';
		thisStockRow += '<td>' + thingToLoopThrough.Name + '</td>';
		thisStockRow += '<td>' + thingToLoopThrough.Ask + '</td>';
		thisStockRow += '<td class="daily-change">' + thingToLoopThrough.Change + '</td>';
		thisStockRow += '<td>' + thingToLoopThrough.DaysHigh + '</td></tr>';
		return thisStockRow;
	}

	function addSpecialClasses(){
		$('.daily-change').each(function(){
			var changeValue = $(this).html();
			if(changeValue.indexOf("+") > -1){
				$(this).addClass('green');
				// console.log("Green");
			}else if(changeValue.indexOf("-") > -1){
				$(this).addClass('red');
				// console.log('Red');
			}
		});
	}
	
});

