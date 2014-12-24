$(function() {
	$('a[href^=http]').click( function() {
		window.open(this.href);
		return false;
	});
});
//
function printPage(){
	$("a.print").click( function(){
		window.print();
		return false;
	});
};
//
function zebraTable() {
	$("table.zebra").find("tbody tr").each(function (e){
		(e%2==0)?$(this).addClass("odd"):null;
	});
};