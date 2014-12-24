
$(document).ready(function() {
  $('#example-interface-animate .trigger').click(function() {
    var afterbox = '.boxafter {' + "\n";
    afterbox += '  height: 180px;' + "\n";
    afterbox += '  width: 500px;' + "\n";
    afterbox += '  padding: 15px;' + "\n";
    afterbox += '  background-color: #000;' + "\n";
    afterbox += '  color: #fff;' + "\n";
    afterbox += '  border: 5px solid #ccc;' + "\n";
    afterbox += '}';
    
    $('div.boxbefore').animate({className:'boxafter'},1000, function() {
      $('code', this).html(afterbox);
    });
  });
});

//SORTABLES
$(document).ready(function() {
  $('#sort-container').Sortable({
  		accept : 'sort-item',
  		hoverclass : 'hover',
      helperclass : 'helper',
  		opacity: 	0.5
  	}
  );
});