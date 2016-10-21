Meteor.subscribe('recintoPropio');

Template.ownerRecintos.onRendered(function () {
	if(Session.get('alertRecintoEditado')){
		$('#alertRecintoEditado').show();
	} else {
		$('#alertRecintoEditado').hide();
	}
});

Template.ownerRecintos.onDestroyed(function() {
	Session.set('alertRecintoEditado', undefined);
});

Template.ownerRecintos.helpers({
	recinto: function () {
		return Recintos.find({ownerId: Meteor.userId()});
	},

	calificacion: function(){
		var cali = Calificaciones.findOne({id_recinto:this._id});
		if(cali){
			var array = cali.votes;
			var promedio = 0;

			for( i=0; i<array.length; i++ ){
				promedio += array[i];
			}
			promedio = promedio / array.length;
			
			return promedio;
	}
	},
});

Template.ownerRecintos.events({
	'click #uploadRecinto': function (event) {
	 Router.go('uploadRecinto', {_id: this._id});
	},
	'click #editRecinto': function(event) {
	Router.go('editRecinto', {_id: this._id});
	},
	'click #lanzarIdRecinto': function (event) {
		var recintoId = this._id;
		Session.set("idRecintoDeleted", recintoId);
	},
	'click #deleteRecinto': function(event) {
		var recintoId = Session.get('idRecintoDeleted');
		Recintos.remove(recintoId);
		$('#alertRecintoEliminado').show();
	},
	'click #dashboardRecinto':function(event) {
		Session.clear();
		Router.go('dashboard', {_id: this._id});
	}
});
