$(document).ready(function(){
	$('form').on('submit',function(){
		var msg=$('form input');
		var MSG=msg.val();
		var current_user=$('#cuser').text();
		var req_user=$('#ruser').text();
		$.ajax({
			type: 'POST',
			url: '/chatting',
			data: {MSG:MSG,current_user:current_user,req_user:req_user},
			success: function(data){
				location.reload();
			}
		});
		return false;
	});
});