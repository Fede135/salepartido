Template.dashboardAdmin.helpers({
	
	usuarioDuenos: function(){
		return Meteor.users.find({'roles.__global_roles__': ['owner']});
	},
	
	usuarioJugador: function(){
		return Meteor.users.find({'roles.__global_roles__': ['player']});
	}
});

Template.dashboardAdmin.events({

	'click #cambiarRoleADueno': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['owner']}});
	
		alert("Este usuario "+this.profile.name+" es dueño ahora");
		
	},

	'click #cambiarRoleAPlayer': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['player']}});
	
		alert("Este usuario "+this.profile.name+" es jugador ahora");
	},

	'click #eliminarPlayer': function (e) {
		
		e.preventDefault;
		
		Meteor.users.remove({_id: this._id});
	
		alert("Este usuario "+this.profile.name+" ha sido eliminado");
		
	},

	'click #eliminarDueno': function (e) {
		
		e.preventDefault;
		
		Meteor.users.remove({_id: this._id});
	
		alert("Este usuario "+this.profile.name+" ha sido eliminado");
	}
});