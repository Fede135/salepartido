Template.modificarReserva.helpers({
	
	recinto: function () {
		//Me busca los recintos del usuario(dueño)logueado.
		var recinto = Recintos.find({ownerId:Meteor.userId()})		
	return recinto;
		
	},

	errorMessage: function(field) {
    return Session.get('reservaErrors')[field];
  		},

  errorClass: function (field) {
    return !!Session.get('reservaErrors')[field] ? 'has-error' : '';
  	}
});

