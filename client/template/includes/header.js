Template.header.events({
	'click #loginButton': function() {
		if (Meteor.user() && Meteor.user().services && Meteor.user().services.facebook) {
			$('#login-buttons-open-change-password').addClass('hidden');
		}	
	},

	// 'keyup #login-password': function () {
	// 	if ($('#login-password').val().length < 8) {
	// 		$('#login-buttons-password').addClass('hidden');
	// 	} else {
	// 		$('#login-buttons-password').removeClass('hidden');
	// 	}
	// }
});



T9n.setLanguage('es');

Template.header.helpers({
	
	emailsVerified: function () {
		return Meteor.users.findOne({_id: Meteor.userId(), 'emails.0.verified': true});
	},
	habilitado: function () {
		return Meteor.users.findOne({_id: Meteor.userId(), 'estado_usuario': "habilitado"});
	},
});

