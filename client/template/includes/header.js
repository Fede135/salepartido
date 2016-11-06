Template.header.helpers({
	emailsVerified: function () {
		return Meteor.users.findOne({_id: Meteor.userId(), 'emails.0.verified': true});
	},
	habilitado: function () {
		return Meteor.users.findOne({_id: Meteor.userId(), 'estado_usuario': "habilitado"});
	}
});