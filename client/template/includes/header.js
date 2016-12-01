Template.loginButtons.onRendered(function(){
    T9n.setLanguage("es");
});

Template.header.events({
	'click #loginButton': function() {
		T9n.setLanguage("es");
		if (Meteor.user() && Meteor.user().services && Meteor.user().services.facebook) {
			$('#login-buttons-open-change-password').addClass('hidden');
		}
},


	// 'keyup #login-email':function() {
	// 	var email = $('#login-email').val();
	// 	usuarioemail = Meteor.users.findOne({'emails.0.address': email});
	// 	//console.log($('.alert-danger').text());
	// 	$('#login-buttons-password').click()
	// 	if (usuarioemail) {
	// 		if($('.alert-danger').text() == 'Email already exists.Email already exists.'){
	// 			$('.alert-danger').text('Este email está en uso.');
	// 		};
	// 		if($('.alert-danger').text() == 'Error, too many requests. Please slow down. You must wait 10 seconds before trying again.Error, too many requests. Please slow down. You must wait 9 seconds before trying again.') {
	// 			$('.alert-danger').text('Demasiadas peticiones. Por favor tranquilícese. Deberá esperar 10 secundos para volver a intentarlo');
	// 		}
	// 	}
	// },


	
	// 'click #login-buttons-password': function () {
	// 	console.log("dsads");
	// 	if($('.alert-danger').text() == 'Email already exists.Email already exists.'){
	// 		Meteor.setTimeout( function(){ $('.alert-danger').text('Este email ya está en uso.');
	// 	}, 2000);
				
	// 	};
	// 	if($('.alert-danger').text() == 'Error, too many requests. Please slow down. You must wait 10 seconds before trying again.Error, too many requests. Please slow down. You must wait 9 seconds before trying again.') {
	// 			$('.alert-danger').text('Demasiadas peticiones. Por favor tranquilícese. Deberá esperar 10 secundos para volver a intentarlo');
	// 	}
	// },


// 		'keyup #login-password': function() {
// 		console.log($('.alert-danger').text());
// 		if (usuarioemail) {
// 			if($('.alert-danger').text() == 'Email already exists.Email already exists.'){
// 				$('.alert-danger').text('Este email está en uso.');
// 			}
// 		}
// 	},

// 	'keyup #login-firstName': function() {
// 		console.log($('.alert-danger').text());
// 		if (usuarioemail) {
// 			if($('.alert-danger').text() == 'Email already exists.Email already exists.'){
// 				$('.alert-danger').text('Este email está en uso.');
// 			}
// 		}
// 	},

// 'keyup #login-lastName': function() {
// 	console.log($('.alert-danger').text());
// 		if (usuarioemail) {
// 			if($('.alert-danger').text() == 'Email already exists.Email already exists.'){
// 				$('.alert-danger').text('Este email ya está en uso.');
// 			}
// 		}
// 	},

	// 'keyup #login-password': function() {
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

