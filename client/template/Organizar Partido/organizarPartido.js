Template.organizarPartido.events({
	'click #crearCancha': function(event) {
		Router.go('crearCancha');
	},	
	'click #seleccionarDia': function(event) {
		Router.go('calendario');
	}
});