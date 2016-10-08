Meteor.methods({
	mailReserva: function(arrayAmigos,partidoId,dia,hora,recinto){
		check(arrayAmigos, Array);
		check(partidoId, String);
		check(dia, String);
		check(hora, String);
		check(recinto, String);		
		
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayAmigos,
				subject: "Sale partido!! el "+dia+" a las "+hora+" horas en "+recinto,
				text: "Si querés jugar visita el siguinte enlace: http://localhost:3000/confirmarpartido/"+partidoId,
			});
		
	}



});

