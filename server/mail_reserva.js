Meteor.methods({
	mailReserva: function(url,correo1){
		check(url, String);
		check(correo1, String);
		Email.send({
			from: "salepartido2016@gmail.com",
			to: correo1,
			subject: "Sale partido!!",
			text: "Te han invitado a un partido, visita el enlace para mas información" + url
		});
	}



});