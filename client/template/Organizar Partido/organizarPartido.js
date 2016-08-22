Template.organizarPartido.events({
	'click #crearCancha': function(event) {
		Router.go('crearCancha');
	},	
	'click #seleccionarDia': function(event) {
		Router.go('calendario');
	},
	'click #my_hidden_input': function(event) {
		
		$('#datepicker').datepicker();
		$('#datepicker').on("changeDate", function() {
    		$('#my_hidden_input').val($('#datepicker').datepicker('getFormattedDate'));
		});
	}	
});