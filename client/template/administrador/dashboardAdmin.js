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
	
		alert("Este usuario "+this.profile.name+" es dueno ahora");
		
	},

	'click #cambiarRoleAPlayer': function (e) {
		
		e.preventDefault;
		
		Meteor.users.update({_id: this._id}, {$set: {'roles.__global_roles__': ['player']}});
	
		alert("Este usuario "+this.profile.name+" es jugador ahora");
		"cambiarRoleAPlayer"
	}
});