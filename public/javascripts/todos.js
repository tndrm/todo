$.get('/loadCases', function(data){
/*	for (var i = 0; i <= data.length - 1; i++) {
		$ (createCheckbox(data[i].value, data[i].checkbox, data[i].id)).appendTo('.dynamic-inputs');
	};
*/
	for (var id in data) {
		$ (createCheckbox(data[id].value, data[id].checkbox, id)).appendTo('.dynamic-inputs');
	}
})

$( "form" ).submit(function( event ) {
	event.preventDefault();
	var val = $('#newCase').val()
	if(!val){
		return
	}else{
		$(this)[0].reset();
		$.get('/add', {val:val} , function(data){
			$ (createCheckbox(data.value, data.checkbox, data.id)).appendTo('.dynamic-inputs');
		});
	}	
})

function createCheckbox(value, checkbox, id) {
	var a = '<label class="label"><input type="checkbox" id="'+ id + '" ' + checkbox + '><span>'+ value + '</span><a href="#" class="delete" id="' + id + '"></a></label>'
	return a
}
$('.dynamic-inputs').on("click" , "input:checkbox" ,function(){
	$.post('/changeCheckbox',{ "id" : this.id})

})
$('.dynamic-inputs').on('click','.delete',function(){
	$.post('/remove',{ "id" : this.id})
	$(this).parent().remove()
});

$('#completed').on('click',function(){
	$("input:checkbox:checked").parent('label').slideDown("fast").on('click',function(){
		$('.label#'+ this.id).slideUp('fast')
	});
    $("input:checkbox:not(:checked)").parent('label').slideUp("fast");
});

$('#active').on('click',function(){
	$("input:checkbox:not(:checked)").parent('label').slideDown("fast").on('click',function(){
		$('.label#'+ this.id).slideUp('fast')
	});
	$("input:checkbox:checked").parent('label').slideUp("fast");
});

$('#all').on('click',function(){
	$("input").parent('label').slideDown("fast").unbind('click');
});

$('#clear').on('click',function(){
    $(".dynamic-inputs > label").each( function() {
    	if ($(this).children("input:checkbox").is(":checked")) $(this).remove();
	});
    $.post('/removeChecked')
});