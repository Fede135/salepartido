Meteor.methods({
	mailModificacion: function(arrayAmigos,partidoId,dia,hora,recinto,organizador,oldHora,oldDia,oldRecinto){
		check(arrayAmigos, Array);
		check(partidoId, String);
		check(dia, String);
		check(hora, Number);
		check(recinto, String);		
		check(oldHora, Number);	
		check(oldDia, String);
		check(oldRecinto, String);
		check(organizador, String);
			Email.send({
				from: "salepartido2016@gmail.com",
				to: arrayAmigos,
				subject: "Modificacion de la reserva.Sale partido!! el "+dia+" a las "+hora+" horas en "+recinto+'.Organiza: '+organizador,
				text: "El partido de dia"+oldDia+"a las"+oldHora+"en el recinto "+oldRecinto+" se modificó.Obtené más información en el siguiente enlace: http://localhost:3000/confirmarpartido/"+partidoId,
			});
		
	}

//falta avisarle al dueño de la cancha

});
