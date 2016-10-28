Template.gestionCancha.onRendered(function() {
  if(Session.get('alertCanchaCreada')) {
    $('#alertCanchaCreada').show();
  } else {
    $('#alertCanchaCreada').hide();
  }
  if(Session.get('alertCanchaEditada')) {
    $('#alertCanchaEditada').show();
  } else {
    $('#alertCanchaEditada').hide();
  }
});

Template.gestionCancha.onDestroyed( function() {
  Session.set('alertCanchaCreada', undefined);
  Session.set('alertCanchaEditada', undefined);
});

Template.gestionCancha.helpers({

	canchasRecinto : function(){
		var canchas = Canchas.find({recintoId:this._id})
			return canchas;

	},
});
	
Template.gestionCancha.events({

	'click #editCancha': function(event) {
	 Router.go('editCancha', {_id: this._id});//ID DE LA CANCHA
	},

  'click #crearCancha': function(event) {
      Router.go('cargarCancha', {_id: this._id}); //ID DEL RECINTO
  },
  
  'click #lanzaIdCancha': function (event) {
		var canchaId = this._id;
		Session.set("idCanchaDeleted", canchaId);
	},

  'click #deleteCancha': function(event) {
		var canchaId = Session.get('idCanchaDeleted');
		Canchas.remove(canchaId);
		$('#alertCanchaEliminada').show();
	},

});
	



