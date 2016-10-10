Meteor.methods({
	mailReserva: function(arrayAmigos,partidoId,dia,hora,recinto,organizador){
		check(arrayAmigos, Array);
		check(partidoId, String);
		check(dia, String);
		check(hora, Number);
		check(recinto, String);		
		check(organizador, String);	
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayAmigos,
				subject: "Sale partido!! el "+dia+" a las "+hora+" horas en "+recinto+'.Organiza: '+organizador,
				text: "Si querés jugar visita el siguinte enlace: http://localhost:3000/confirmarpartido/"+partidoId,
			});
		
	}

//falta avisarle al dueño de la cancha

});

